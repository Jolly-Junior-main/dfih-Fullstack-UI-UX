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
          <Badge variant="secondary" className="uppercase tracking-wider text-[10px] font-bold bg-[#698765] text-[#84cc16] border border-[#84cc16]/20">
            <FileText className="w-3 h-3 mr-1" />
            {resourceType}
          </Badge>
        </div>
        <h3 className="text-xl font-bold leading-tight text-[#f5f0e6] line-clamp-2" title={title}>
          {title}
        </h3>
        <div className="text-xs text-[#f5f0e6]/50 mt-3 space-y-1">
          <p className="font-medium text-[#f5f0e6]/80">{organization}</p>
          <p>{year} &bull; {theme}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-[#f5f0e6]/70 text-sm line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-4 border-t border-white/20 bg-[#698765]/30 flex gap-3 mt-4">
        <Button 
          variant="outline" 
          className="w-full flex-1 border-[#f5f0e6]/20 bg-transparent text-[#f5f0e6] hover:bg-[#f5f0e6] hover:text-[#698765]"
          onClick={() => onView?.(id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button 
          variant="default" 
          size="icon"
          title="Download Document"
          className="bg-[#f5f0e6] text-[#698765] hover:bg-[#e6dfcf]"
          onClick={() => onDownload?.(id)}
        >
          <Download className="w-4 h-4" />
          <span className="sr-only">Download</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
