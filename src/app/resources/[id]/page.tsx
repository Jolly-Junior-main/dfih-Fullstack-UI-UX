import Link from "next/link"
import { ArrowLeft, Download, FileText, Calendar, Building, BookOpen, Tag, Users, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThematicCarousel } from "@/components/resources/ThematicCarousel"

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
    <div className="flex flex-col min-h-screen bg-[#163022] text-[#f5f0e6] pb-20 pt-20">
      <div className="bg-[#11281b]/80 border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex text-sm text-[#cbd5e1] font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#84cc16]">Home</Link>
            <span className="mx-2 text-[#cbd5e1]/40">/</span>
            <Link href="/resources" className="hover:text-[#84cc16]">Resources</Link>
            <span className="mx-2 text-[#cbd5e1]/40">/</span>
            <Link href={`/resources?theme=${encodeURIComponent(resource.theme)}`} className="hover:text-[#84cc16]">{resource.theme}</Link>
            <span className="mx-2 text-[#cbd5e1]/40">/</span>
            <span className="text-[#f5f0e6] truncate max-w-[200px] sm:max-w-xs">{resource.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/resources"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Search</Link>
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#1c3d2b]/70 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md p-6 sm:p-8 lg:p-10 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="uppercase tracking-wider text-xs font-bold px-3 py-1 bg-[#84cc16] text-[#0f2317] border-0">
                  <FileText className="w-3 h-3 mr-1.5" />
                  {resource.resourceType}
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f5f0e6] leading-tight mb-6">
                {resource.title}
              </h1>
              
              <div className="max-w-none text-[#cbd5e1] mb-10">
                <h3 className="text-xl font-bold text-[#f5f0e6] mb-3">Abstract / Description</h3>
                <p className="leading-relaxed text-sm md:text-base">{resource.description}</p>
              </div>

              {/* DOCUMENT PREVIEW */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0f2317] flex flex-col shadow-inner">
                <div className="bg-[#142e20] text-[#f5f0e6] p-3.5 flex justify-between items-center text-sm font-medium border-b border-white/10">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#84cc16]" />
                    Document Preview
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#cbd5e1]/60 text-xs">Page 1 of {resource.pages}</span>
                    <Button variant="ghost" size="sm" className="h-8 text-[#cbd5e1] hover:text-[#ffffff] hover:bg-white/10">
                      <Eye className="w-4 h-4 mr-2" /> Open Full Screen
                    </Button>
                  </div>
                </div>
                <div className="h-[500px] flex items-center justify-center bg-[#0d1e14] text-[#cbd5e1] relative">
                  <div className="text-center p-8 bg-[#163022]/90 border border-white/10 shadow-2xl rounded-2xl max-w-md mx-auto">
                    <FileText className="w-16 h-16 mx-auto text-[#84cc16] mb-4 opacity-80" />
                    <h4 className="font-bold text-[#f5f0e6] text-lg mb-2">Document Ready to View</h4>
                    <p className="text-xs text-[#cbd5e1]/70 mb-6">This research manuscript and inventory dataset can be previewed or downloaded directly.</p>
                    <Button className="w-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold">
                      View Online Reader
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <div className="bg-[#1c3d2b]/70 border border-white/10 rounded-2xl shadow-xl backdrop-blur-md p-6 sticky top-28">
              <Button size="lg" className="w-full bg-[#84cc16] hover:bg-[#a3e635] text-[#0f2317] font-bold mb-4 shadow-lg shadow-[#84cc16]/20">
                <Download className="w-5 h-5 mr-2" />
                Download Document
              </Button>
              <div className="text-center text-xs text-[#cbd5e1]/70 font-medium mb-6">
                {resource.fileFormat} • {resource.fileSize}
              </div>
              
              <h3 className="font-bold text-[#f5f0e6] border-b border-white/10 pb-3 mb-4">Resource Information</h3>
              
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="flex items-center text-[#cbd5e1]/70 mb-1">
                    <Calendar className="w-4 h-4 mr-2 text-[#84cc16]" /> Publication Date
                  </dt>
                  <dd className="font-medium text-[#f5f0e6] pl-6">{resource.publicationDate}</dd>
                </div>
                <div>
                  <dt className="flex items-center text-[#cbd5e1]/70 mb-1">
                    <Building className="w-4 h-4 mr-2 text-[#84cc16]" /> Organization
                  </dt>
                  <dd className="font-medium text-[#f5f0e6] pl-6">
                    <Link href={`/partners`} className="text-[#84cc16] hover:underline">
                      {resource.organization}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center text-[#cbd5e1]/70 mb-1">
                    <BookOpen className="w-4 h-4 mr-2 text-[#84cc16]" /> Theme
                  </dt>
                  <dd className="font-medium text-[#f5f0e6] pl-6">
                    <Link href={`/resources?theme=${encodeURIComponent(resource.theme)}`} className="text-[#84cc16] hover:underline">
                      {resource.theme}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center text-[#cbd5e1]/70 mb-1">
                    <Users className="w-4 h-4 mr-2 text-[#84cc16]" /> Authors
                  </dt>
                  <dd className="font-medium text-[#f5f0e6] pl-6">
                    <ul className="space-y-1">
                      {resource.authors.map(author => (
                        <li key={author}>{author}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="pt-2">
                  <dt className="flex items-center text-[#cbd5e1]/70 mb-2">
                    <Tag className="w-4 h-4 mr-2 text-[#84cc16]" /> Keywords
                  </dt>
                  <dd className="pl-6 flex flex-wrap gap-2">
                    {resource.keywords.map(kw => (
                      <Badge key={kw} variant="outline" className="bg-[#142e20] border-white/10 text-[#cbd5e1] font-normal">
                        {kw}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* RELATED THEMATIC AREAS CAROUSEL */}
        <div className="pt-10 border-t border-white/10">
          <ThematicCarousel 
            title="Explore Other Thematic Areas"
            subtitle="Explore research and publications across all forestry fields"
          />
        </div>
      </div>
    </div>
  )
}
