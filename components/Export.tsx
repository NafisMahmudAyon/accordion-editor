import { Typography } from 'aspect-ui/Typography'
import { Sidebar, SidebarContainer, SidebarHeader, SidebarItem } from 'aspect-ui/Sidebar'
import React from 'react'
import { AccordionsData } from './Global'
import CodeSnippet from './CodeSnippet'

interface ExportProps {
  accordionData: AccordionsData
}

const Export: React.FC<ExportProps> = ({ accordionData }) => {
  const id = accordionData.id
  const title = accordionData.title
  const content = accordionData.content
  const status = accordionData.status
  const type = "html"

  console.log("id:", id, "title:", title, "content:", content)

  if (status === "publish") {
    return (
      <div className='max-h-[70vh] min-h-[600px] container flex justify-between mx-auto p-4 rounded-lg shadow-xl bg-primary-200 dark:bg-primary-900'>
        <Sidebar className='h-full'>
          <SidebarHeader>
            <h2 className='text-xl font-bold'>Export</h2>
          </SidebarHeader>
          <SidebarContainer>
            <SidebarItem>HTML</SidebarItem>
            <SidebarItem>Iframe</SidebarItem>
            <SidebarItem>React</SidebarItem>
            <SidebarItem>WordPress</SidebarItem>
            <SidebarItem>Gutenberg Block</SidebarItem>
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
                bodyStyles="!font-code max-h-[300px] !my-0"
                content={`
    <div id="aspect-accordion-${id}" className="aspect-accordion">
      <div className="aspect-accordion-wrapper ${content.global.accordionClassName || ''}">
        ${content.items.map(
                  (item) => `
          <div key="${item.id}" className="aspect-accordion-item ${item.accordionClassName || ''}">
            <!-- Accordion Header  -->
            <div className="aspect-accordion-header ${item.headerClassName || ''}">
              <span className="aspect-accordion-label">
                ${item.headerLabel}
              </span>
              ${item.iconEnabled
                      ? `
              <span className="aspect-accordion-icon">
                <i className="${item.iconClassName}"></i>
              </span>`
                      : ''
                    }
            </div>

            {/* Accordion Content */}
            <div className="aspect-accordion-content ${item.contentClassName || ''}">
              ${item.content}
            </div>
          </div>`
                ).join('')}
      </div>

      <script
        type="application/json"
        className="aspect-accordion-data" data-accordion-id="${id}"></script>
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