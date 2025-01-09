'use client'
import { Sidebar, SidebarContainer, SidebarHeader, SidebarItem } from 'aspect-ui/Sidebar'
import { Typography } from 'aspect-ui/Typography'
import React from 'react'
import CodeSnippet from './CodeSnippet'
import { AccordionsData } from './Global'

interface ExportProps {
  accordionData: AccordionsData
}

const Export: React.FC<ExportProps> = ({ accordionData }) => {
  const id = accordionData.id
  const title = accordionData.title
  const content = accordionData.content
  const status = accordionData.status
  const type = "html"
  const [exportType, setExportType] = React.useState('html')

  console.log("id:", id, "title:", title, "content:", content)

  if (status === "publish") {
    return (
      <div className='max-h-[70vh] min-h-[600px] container flex justify-between mx-auto p-4 rounded-lg shadow-xl bg-primary-900 dark:bg-primary-900'>
        <Sidebar className='max-h-full h-auto'>
          <SidebarHeader>
            <h2 className='text-xl font-bold'>Export</h2>
          </SidebarHeader>
          <SidebarContainer>
            <SidebarItem className={`${exportType === 'html' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "html")}>HTML</SidebarItem>
            <SidebarItem className={`${exportType === 'iframe' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "iframe")}>Iframe</SidebarItem>
            <SidebarItem className={`${exportType === 'react' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "react")}>React</SidebarItem>
            <SidebarItem className={`${exportType === 'wordpress' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "wordpress")}>WordPress</SidebarItem>
            <SidebarItem className={`${exportType === 'gutenberg' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "gutenberg")}>Gutenberg Block</SidebarItem>
          </SidebarContainer>
        </Sidebar>
        <div className='flex-1 min-w-[600px] p-4 overflow-y-scroll'>
          {/* <iframe
            src={`/api/accordion/export-html/${id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          /> */}
          {type === "html" && (
            <>
              <Typography tagName='p'>Use this code in your HTML:</Typography>
              <CodeSnippet
                lang="html"
                headerStyles="bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
                bodyStyles="max-h-[300px] !my-0"
                content={`
    <div id="aspect-accordion-${id}" class="aspect-accordion">
      <div class="aspect-accordion-wrapper aspect-accordion-data ${content.global.accordionClassName || ''}" data-accordion-id="${id}">
        ${content.items.map(
                  (item) => `
          <div key="${item.id}" class="aspect-accordion-item ${item.accordionClassName || ''}">
            <!-- Accordion Header  -->
            <div class="aspect-accordion-header ${item.headerClassName || ''}">
              <span class="aspect-accordion-label">
                ${item.headerLabel}
              </span>
              ${item.iconEnabled
                      ? `
              <span class="aspect-accordion-icon">
                <i class="${item.iconClassName}"></i>
              </span>`
                      : ''
                    }
            </div>

            <!-- Accordion Content  -->
            <div class="aspect-accordion-content ${item.contentClassName || ''}">
              ${item.content}
            </div>
          </div>`
                ).join('')}
      </div>
      <script src="https://cdn.jsdelivr.net/gh/nafismahmudayon/aspect-accordion-js@latest/build/index-build.js"></script>
      <!-- Add Tailwind CSS Script if your project is not using tailwind  -->
      <script src="https://cdn.tailwindcss.com/3.4.15"></script>
    </div>
  `}
              />

            </>
          )}

        </div>
      </div>
    )
  }
  if (status === "draft" || status === "trash") {
    return (
      <div>Please publish to export</div>
    )
  }

  return (
    null
  )
}

export default Export