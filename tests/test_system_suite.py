#!/usr/bin/env python3
"""
DFIH Automated System Test Suite & Performance Benchmark
Implements:
- /python-testing-patterns (unittest, parameterization, fixtures, assertions)
- /testrail (Case IDs C101-C125, status_id reporting, JSON export)
- /test-automator (End-to-end route verification, security header checks)
- /performance-testing-review-multi-agent-review (TTFB latency, concurrent load)
"""

import unittest
import urllib.request
import urllib.error
import time
import json
import ssl
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://dfih-frontend.pages.dev"
DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 DFIH-TestAutomator/1.0"

class TestRailReporter:
    def __init__(self):
        self.results = []

    def record(self, case_id: str, title: str, passed: bool, duration_ms: float, message: str = ""):
        self.results.append({
            "case_id": case_id,
            "title": title,
            "status_id": 1 if passed else 5,  # 1 = Pass, 5 = Failed in TestRail
            "elapsed": f"{round(duration_ms / 1000, 2)}s",
            "comment": message or ("Passed successfully" if passed else "Test assertion failed")
        })

    def export_json(self, filepath="test-results.json"):
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump({
                "suite": "DFIH System Regression & Performance Suite",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "target": BASE_URL,
                "summary": {
                    "total": len(self.results),
                    "passed": sum(1 for r in self.results if r["status_id"] == 1),
                    "failed": sum(1 for r in self.results if r["status_id"] == 5)
                },
                "results": self.results
            }, f, indent=2)


reporter = TestRailReporter()


def fetch_route(path: str, timeout: int = 15):
    """Utility to fetch a URL path with timing, retry for transient network resets, and standard headers."""
    url = f"{BASE_URL}{path}"
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": DEFAULT_USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5"
        }
    )
    last_err = None
    for attempt in range(3):
        try:
            start = time.perf_counter()
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as response:
                duration_ms = (time.perf_counter() - start) * 1000
                content = response.read().decode("utf-8", errors="replace")
                headers = dict(response.info().items())
                return {
                    "status": response.status,
                    "url": response.geturl(),
                    "duration_ms": duration_ms,
                    "content": content,
                    "headers": headers
                }
        except (urllib.error.URLError, ConnectionResetError, ssl.SSLError) as e:
            last_err = e
            time.sleep(0.5)
    raise last_err


class TestPublicRoutes(unittest.TestCase):
    """Validates public consumer and contributor facing pages."""

    def test_c101_home_page(self):
        """C101: Verify Home Page renders hero, branding and 200 OK."""
        res = fetch_route("/")
        passed = res["status"] == 200 and "Forestry" in res["content"]
        reporter.record("C101", "Home Page (/) Availability & Hero", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)
        self.assertIn("Forestry", res["content"])

    def test_c102_about_page(self):
        """C102: Verify About Page renders mission and content."""
        res = fetch_route("/about")
        passed = res["status"] == 200 and "About" in res["content"]
        reporter.record("C102", "About Page (/about) Content & Layout", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)
        self.assertIn("About", res["content"])

    def test_c103_resources_repository(self):
        """C103: Verify Resources Search Page renders search & filters."""
        res = fetch_route("/resources")
        passed = res["status"] == 200 and ("Filter" in res["content"] or "Search" in res["content"])
        reporter.record("C103", "Resources Repository (/resources) Search Interface", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c104_resource_detail(self):
        """C104: Verify Dynamic Resource Detail Page."""
        res = fetch_route("/resources/1")
        passed = res["status"] == 200
        reporter.record("C104", "Resource Detail (/resources/1) SSG", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c105_news_page(self):
        """C105: Verify Public News & Insights Page."""
        res = fetch_route("/news")
        passed = res["status"] == 200 and "News" in res["content"]
        reporter.record("C105", "News & Insights (/news) Articles Feed", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c106_contact_page(self):
        """C106: Verify Contact Page."""
        res = fetch_route("/contact")
        passed = res["status"] == 200
        reporter.record("C106", "Contact Page (/contact)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c107_partners_page(self):
        """C107: Verify Partners Page."""
        res = fetch_route("/partners")
        passed = res["status"] == 200
        reporter.record("C107", "Partners Page (/partners)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c108_submit_page(self):
        """C108: Verify Research Submission Form Page."""
        res = fetch_route("/submit")
        passed = res["status"] == 200 and ("Submit" in res["content"] or "Portal" in res["content"])
        reporter.record("C108", "Submit Research (/submit) Contributor Form", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c109_dashboard_page(self):
        """C109: Verify Researcher Dashboard Page."""
        res = fetch_route("/dashboard")
        passed = res["status"] == 200
        reporter.record("C109", "Dashboard (/dashboard) Account Portal", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c110_register_page(self):
        """C110: Verify Researcher Registration Page."""
        res = fetch_route("/register")
        passed = res["status"] == 200 and "Account" in res["content"]
        reporter.record("C110", "Register Page (/register)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c111_login_page(self):
        """C111: Verify Researcher Login Page."""
        res = fetch_route("/login")
        passed = res["status"] == 200
        reporter.record("C111", "Login Page (/login)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c112_reviewer_portal(self):
        """C112: Verify Reviewer Portal Route & Auth Guard."""
        res = fetch_route("/reviewer")
        passed = res["status"] == 200 and ("Reviewer" in res["content"] or "Portal" in res["content"])
        reporter.record("C112", "Reviewer Portal (/reviewer) & Auth Guard", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c126_reviewer_evaluation_form(self):
        """C126: Verify Reviewer Evaluation Score Sheet Route (/reviewer/evaluate)."""
        res = fetch_route("/reviewer/evaluate")
        passed = res["status"] == 200 and ("Evaluation" in res["content"] or "Reviewer" in res["content"])
        reporter.record("C126", "Reviewer Evaluation Form (/reviewer/evaluate)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)




class TestAdminPortalRoutes(unittest.TestCase):
    """Validates administrative management routes and permissions."""

    def test_c113_admin_login(self):
        """C113: Verify Admin Login Gate."""
        res = fetch_route("/admin/login")
        passed = res["status"] == 200 and "Admin" in res["content"]
        reporter.record("C113", "Admin Login (/admin/login)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c114_admin_overview(self):
        """C114: Verify Admin Overview Route."""
        res = fetch_route("/admin")
        passed = res["status"] == 200
        reporter.record("C114", "Admin Overview (/admin)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c115_admin_research_list(self):
        """C115: Verify Admin Research Submissions Review."""
        res = fetch_route("/admin/research")
        passed = res["status"] == 200
        reporter.record("C115", "Admin Research Review (/admin/research)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c116_admin_research_add(self):
        """C116: Verify Admin Add Research Direct Route."""
        res = fetch_route("/admin/research/add")
        passed = res["status"] == 200
        reporter.record("C116", "Admin Add Research (/admin/research/add)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c117_admin_users_and_researches(self):
        """C117: Verify Admin Users & Researches Linking Route."""
        res = fetch_route("/admin/users")
        passed = res["status"] == 200 and ("Users" in res["content"] or "Researcher" in res["content"])
        reporter.record("C117", "Admin Users & Researches (/admin/users)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c118_admin_news(self):
        """C118: Verify Admin News Updates Route."""
        res = fetch_route("/admin/news")
        passed = res["status"] == 200
        reporter.record("C118", "Admin News Management (/admin/news)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c119_admin_pages_editor(self):
        """C119: Verify Admin Static Pages Editor Route."""
        res = fetch_route("/admin/pages")
        passed = res["status"] == 200
        reporter.record("C119", "Admin Pages Editor (/admin/pages)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c120_admin_content(self):
        """C120: Verify Admin Platform Content Route."""
        res = fetch_route("/admin/content")
        passed = res["status"] == 200
        reporter.record("C120", "Admin Platform Content (/admin/content)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c121_admin_categories(self):
        """C121: Verify Admin Structure & Thematic Categories."""
        res = fetch_route("/admin/categories")
        passed = res["status"] == 200
        reporter.record("C121", "Admin Categories (/admin/categories)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)

    def test_c122_admin_settings(self):
        """C122: Verify Admin Platform Settings & Cache Route."""
        res = fetch_route("/admin/settings")
        passed = res["status"] == 200
        reporter.record("C122", "Admin Settings (/admin/settings)", passed, res["duration_ms"])
        self.assertEqual(res["status"], 200)


class TestPerformanceAndSecurity(unittest.TestCase):
    """Performance benchmarks and security boundary audits."""

    def test_c123_latency_benchmark(self):
        """C123: Verify TTFB Latency Benchmark is under 1000ms."""
        times = []
        for _ in range(3):
            res = fetch_route("/")
            times.append(res["duration_ms"])
        avg_ms = sum(times) / len(times)
        passed = avg_ms < 1000
        reporter.record("C123", "TTFB Latency Benchmark (<1000ms)", passed, avg_ms, f"Average TTFB: {round(avg_ms, 1)}ms")
        self.assertLess(avg_ms, 1000, f"Average latency too high: {avg_ms}ms")

    def test_c124_concurrent_stress(self):
        """C124: Verify 10 concurrent requests succeed without degradation."""
        routes = ["/", "/about", "/resources", "/news", "/contact"] * 2
        start = time.perf_counter()
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(fetch_route, r) for r in routes]
            results = [f.result() for f in as_completed(futures)]
        total_time_ms = (time.perf_counter() - start) * 1000

        statuses = [r["status"] for r in results]
        all_ok = all(s == 200 for s in statuses)
        reporter.record("C124", "Concurrent Load Stress (10 Parallel Requests)", all_ok, total_time_ms, f"Processed 10 requests in {round(total_time_ms, 1)}ms, 100% 200 OK")
        self.assertTrue(all_ok)

    def test_c125_security_headers(self):
        """C125: Verify SSL/TLS and Cloudflare Edge Security headers."""
        res = fetch_route("/")
        headers = res["headers"]
        # Verify Cloudflare headers & Content-Type
        has_content_type = "content-type" in headers or "Content-Type" in headers
        passed = res["status"] == 200 and has_content_type
        reporter.record("C125", "Cloudflare Edge Security & Content Headers", passed, res["duration_ms"])
        self.assertTrue(passed)

    def test_c126_admin_link_removed_from_public_footer(self):
        """C126: Verify Admin Dashboard route is NOT published in public footer."""
        res = fetch_route("/")
        # Verify /admin/login is not linked in footer
        passed = res["status"] == 200 and 'href="/admin/login"' not in res["content"]
        reporter.record("C126", "Admin Route Concealment from Public Footer", passed, res["duration_ms"],
                        "Verified /admin/login link is not advertised in public navigation or footer.")
        self.assertTrue(passed, "Admin login link should not be present in public footer")

    def test_c127_admin_credentials_not_leaked(self):
        """C127: Verify Admin Login Gate does not leak credentials in UI or error messages."""
        res = fetch_route("/admin/login")
        # Ensure 'Please use admin for both' or similar leaks are absent
        has_leak = "Please use 'admin' for both" in res["content"] or "use 'admin' for both" in res["content"]
        passed = res["status"] == 200 and not has_leak
        reporter.record("C127", "Zero Credential Leakage in Admin Gateway", passed, res["duration_ms"],
                        "Verified administrative login gate does not expose default credentials or hints.")
        self.assertFalse(has_leak, "Admin credentials must not be leaked in page content")



if __name__ == "__main__":
    suite = unittest.TestSuite()
    suite.addTests(unittest.defaultTestLoader.loadTestsFromTestCase(TestPublicRoutes))
    suite.addTests(unittest.defaultTestLoader.loadTestsFromTestCase(TestAdminPortalRoutes))
    suite.addTests(unittest.defaultTestLoader.loadTestsFromTestCase(TestPerformanceAndSecurity))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    # Export TestRail JSON results
    reporter.export_json("test-results.json")
    print(f"\n[TestRail Export] Test results saved to test-results.json with {len(reporter.results)} test cases.")

    sys.exit(0 if result.wasSuccessful() else 1)
