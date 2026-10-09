"use client"

import * as React from "react"
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
    <Card className="flex flex-col h-full hover:shadow-2xl transition-all duration-300 border-white/20 bg-white/15 backdrop-blur-md rounded-[20px] overflow-hidden group hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="uppercase tracking-wider text-[10px] font-bold bg-[#ffffff] text-[#84cc16] border border-[#84cc16]/20">
            <FileText className="w-3 h-3 mr-1" />
            {resourceType}
          </Badge>
        </div>
        <h3 className="text-xl font-bold leading-tight text-[#0f172a] line-clamp-2" title={title}>
          {title}
        </h3>
        <div className="text-xs text-[#0f172a]/50 mt-3 space-y-1">
          <p className="font-medium text-[#0f172a]/80">{organization}</p>
          <p>{year} &bull; {theme}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-[#0f172a]/70 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-white/20 bg-[#ffffff]/30 flex gap-3 mt-4">
        <Button 
          variant="outline" 
          className="w-full flex-1 border-[#0f172a]/20 bg-transparent text-[#0f172a] hover:bg-[#0f172a] hover:text-[#ffffff]"
          onClick={() => onView?.(id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button 
          variant="default" 
          size="icon"
          title="Download Document"
          className="bg-[#0f172a] text-[#ffffff] hover:bg-[#e6dfcf]"
          onClick={() => onDownload?.(id)}
        >
          <Download className="w-4 h-4" />
          <span className="sr-only">Download</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
