"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye } from "lucide-react"

export interface ResourceCardProps {
  id: string
  title: string
  resourceType: string
  organization: string
  year: number
  theme: string
  description: string
  onView?: (id: string) => void
  onDownload?: (id: string) => void
}

export function ResourceCard({
  id,
  title,
  resourceType,
  organization,
  year,
  theme,
  description,
  onView,
  onDownload
}: ResourceCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 border-white/20 bg-[#84cc16]/15 backdrop-blur-md rounded-[20px] overflow-hidden group hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="uppercase tracking-wider text-[10px] font-bold bg-[#ffffff] text-[#163022] border border-white/20">
            <FileText className="w-3 h-3 mr-1 text-[#84cc16]" />
            {resourceType}
          </Badge>
        </div>
        <Link href={`/resources/${id}`}>
          <h3 className="text-xl font-bold leading-tight text-white group-hover:text-[#84cc16] transition-colors line-clamp-2" title={title}>
            {title}
          </h3>
        </Link>
        <div className="text-xs text-white/70 mt-3 space-y-1">
          <p className="font-semibold text-white/95">{organization}</p>
          <p className="text-[#cbd5e1]">{year} &bull; {theme}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-[#f5f0e6]/90 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-white/15 bg-white/5 flex gap-3 mt-4">
        {onView ? (
          <Button 
            variant="outline" 
            className="w-full flex-1 border-white/30 bg-white/10 text-white hover:bg-[#84cc16] hover:text-[#0f2317] hover:border-[#84cc16] font-semibold transition-all shadow-sm"
            onClick={() => onView(id)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full flex-1 border-white/30 bg-white/10 text-white hover:bg-[#84cc16] hover:text-[#0f2317] hover:border-[#84cc16] font-semibold transition-all shadow-sm"
            asChild
          >
            <Link href={`/resources/${id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
        )}
        <Button 
          variant="default" 
          size="icon"
          title="Download Document"
          className="bg-[#84cc16] text-[#0f2317] hover:bg-[#a3e635] shadow-sm"
          onClick={() => onDownload?.(id)}
        >
          <Download className="w-4 h-4" />
          <span className="sr-only">Download</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
