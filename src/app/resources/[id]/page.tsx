import Link from "next/link"
import { ArrowLeft, Download, FileText, Calendar, Building, BookOpen, Tag, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }]
}

export default function ResourceDetailsPage({ params }: { params: { id: string } }) {
  // Mock data representing a detailed resource fetch based on ID
  const resource = {
    id: params.id,
    title: "National Forest Inventory and Status Report 2024",
    resourceType: "Report",
    publicationDate: "March 15, 2024",
    year: 2024,
    organization: "Ministry of Environment",
    theme: "Policy and Governance",
    authors: ["Dr. Abebe Bekele", "Sarah Jenkins", "Dr. Yonas Tadesse"],
    description: "This comprehensive report provides an updated assessment of the national forest cover, outlining deforestation trends, conservation success stories, and priority areas for ecological restoration over the past five years. It includes detailed statistical models, remote sensing data analysis, and policy recommendations for sustainable management.",
    keywords: ["Forest Inventory", "Deforestation", "Conservation", "Policy", "Remote Sensing"],
    fileSize: "4.2 MB",
    fileFormat: "PDF",
    pages: 142
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex text-sm text-gray-500 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/resources" className="hover:text-gray-900">Resources</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/themes/policy-and-governance`} className="hover:text-gray-900">{resource.theme}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 truncate max-w-[200px] sm:max-w-xs">{resource.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/resources"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Search</Link>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 lg:p-10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="uppercase tracking-wider text-xs font-bold px-3 py-1">
                  <FileText className="w-3 h-3 mr-1.5" />
                  {resource.resourceType}
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
                {resource.title}
              </h1>
              
              <div className="prose prose-lg prose-green max-w-none text-gray-700 mb-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Abstract / Description</h3>
                <p className="leading-relaxed">{resource.description}</p>
              </div>

              {/* 14 — DOCUMENT PREVIEW */}
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex flex-col">
                <div className="bg-gray-800 text-white p-3 flex justify-between items-center text-sm font-medium">
                  <span>Document Preview</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-xs">Page 1 of {resource.pages}</span>
                    <Button variant="ghost" size="sm" className="h-8 text-gray-300 hover:text-white hover:bg-gray-700">
                      <Eye className="w-4 h-4 mr-2" /> Open Full Screen
                    </Button>
                  </div>
                </div>
                <div className="h-[600px] flex items-center justify-center bg-gray-200 text-gray-500 relative">
                  {/* Placeholder for PDF Viewer */}
                  <div className="text-center p-8 bg-white shadow-sm rounded-lg max-w-md mx-auto">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h4 className="font-semibold text-gray-700 mb-2">Preview Available</h4>
                    <p className="text-sm text-gray-500 mb-6">This document can be previewed in the browser. In the final implementation, a PDF viewer component will render here.</p>
                    <Button variant="outline" className="w-full">Load Preview</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-28">
              <Button size="lg" className="w-full bg-green-800 hover:bg-green-900 mb-6">
                <Download className="w-5 h-5 mr-2" />
                Download Document
              </Button>
              <div className="text-center text-xs text-gray-500 font-medium mb-8">
                {resource.fileFormat} • {resource.fileSize}
              </div>
              
              <h3 className="font-bold text-gray-900 border-b pb-3 mb-4">Resource Information</h3>
              
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="flex items-center text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 mr-2" /> Publication Date
                  </dt>
                  <dd className="font-medium text-gray-900 pl-6">{resource.publicationDate}</dd>
                </div>
                <div>
                  <dt className="flex items-center text-gray-500 mb-1">
                    <Building className="w-4 h-4 mr-2" /> Organization
                  </dt>
                  <dd className="font-medium text-gray-900 pl-6">
                    <Link href={`/partners/${resource.organization}`} className="text-green-800 hover:underline">
                      {resource.organization}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center text-gray-500 mb-1">
                    <BookOpen className="w-4 h-4 mr-2" /> Theme
                  </dt>
                  <dd className="font-medium text-gray-900 pl-6">
                    <Link href={`/themes`} className="text-green-800 hover:underline">
                      {resource.theme}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center text-gray-500 mb-1">
                    <Users className="w-4 h-4 mr-2" /> Authors
                  </dt>
                  <dd className="font-medium text-gray-900 pl-6">
                    <ul className="space-y-1">
                      {resource.authors.map(author => (
                        <li key={author}>{author}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="pt-2">
                  <dt className="flex items-center text-gray-500 mb-2">
                    <Tag className="w-4 h-4 mr-2" /> Keywords
                  </dt>
                  <dd className="pl-6 flex flex-wrap gap-2">
                    {resource.keywords.map(kw => (
                      <Badge key={kw} variant="outline" className="bg-gray-50 font-normal">
                        {kw}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
