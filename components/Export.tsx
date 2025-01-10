'use client'
import { Sidebar, SidebarContainer, SidebarHeader, SidebarItem } from 'aspect-ui/Sidebar'
import { Typography } from 'aspect-ui/Typography'
// import ReactHtmlParser from 'react-html-parser';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import CodeSnippet from './CodeSnippet'
import { AccordionsData } from './Global'
import IconSelector from './icons/IconSelector'
import { cn } from './utils/cn'


interface ExportProps {
  accordionData: AccordionsData
}

const Export: React.FC<ExportProps> = ({ accordionData }) => {
  const id = accordionData.id
  const content = accordionData.content
  const status = accordionData.status
  const [exportType, setExportType] = React.useState('html')

  const activeItems =
    content?.global.activeItems?.map((index) => `item-${index + 1}`) || [];

  console.log(<IconSelector
    iconType={content.global.activeIconType}
    iconName={content.global.activeIcon}
  />)

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
            {/* <SidebarItem className={`${exportType === 'wordpress' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "wordpress")}>WordPress</SidebarItem>
            <SidebarItem className={`${exportType === 'gutenberg' ? "bg-primary-900 text-primary-200" : ""}`} onClick={() => setExportType(() => "gutenberg")}>Gutenberg Block</SidebarItem> */}
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
          {exportType === "html" && (
            <>
              <Typography tagName='p' className='text-primary-200 dark:text-primary-900'>Use this code in your HTML:</Typography>
              <CodeSnippet
                lang="html"
                headerStyles="bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
                bodyStyles=" !my-0"
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

          {exportType === "react" && (
            <>
              <Typography tagName='p' className='text-primary-200 dark:text-primary-900'>Use this code in your React App:</Typography>
              <CodeSnippet
                lang="jsx"
                headerStyles="bg-gray-800 dark:bg-gray-200 text-gray-200 dark:text-gray-800"
                bodyStyles=" !my-0"
                content={`
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from 'aspect-accordion';

function App() {

  const accordion = {
    try{
      fetch('/api/accordion/fetch-data/id=${id}')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch accordion data');
          }
          return res.json();
        })
        .then((data) => {
        const accordionData = data.data[0];
          return accordionData.content;
        })
        .catch((error) => {
          console.error('Error fetching accordion data:', error);
          return null;
        })
    }
  }
  return (
    <Accordion
					activeItem="${activeItems}"
					iconEnabled={${content.global.iconEnabled}}
					iconPosition="${content.global.iconPosition}"
					className="${content.global.accordionClassName}"
					multiple={${content.global.multiple}}
					reset={true}>
					${content.items.map((item, index) => `
							<AccordionItem
								id={"item-${index + 1}"}
                disabled={${item.disabled === true ? true : false}}>
                <AccordionHeader
                  iconEnabled={${item.iconEnabled ? item.iconEnabled : content.global.iconEnabled}}
                  iconPosition="${item.iconPosition ? item.iconPosition : content.global.iconPosition}"
                  iconClassName="${cn(content.global.inactiveIconClassName, item.iconClassName)}"
                  activeIconClassName="${cn(content.global.activeIconClassName, item.activeIconClassName)}"
                  activeIcon={${ReactDOMServer.renderToStaticMarkup(
                  item.activeIcon.length > 0 ? (
                    <IconSelector
                      iconType={item.activeIconType}
                      iconName={item.activeIcon}
                    />
                  ) : (
                    <IconSelector
                      iconType={content.global.activeIconType}
                      iconName={content.global.activeIcon}
                    />
                  ))
                  }}
                  inactiveIcon={${ReactDOMServer.renderToStaticMarkup(
                    item.inactiveIcon.length > 0 ? (
                      <IconSelector
                        iconType={item.inactiveIconType}
                        iconName={item.inactiveIcon}
                      />
                    ) : (
                      <IconSelector
                        iconType={content.global.inactiveIconType}
                        iconName={content.global.inactiveIcon}
                      />
                    ))
                  }}
                  className="${cn(content.global.headerClassName, item.headerClassName)}"
                  labelClassName="${cn(content.global.labelClassName, item.labelClassName)}"
                  activeHeaderClassName="${cn(content.global.activeHeaderClassName, item.activeHeaderClassName)}"
                  activeLabelClassName="${cn(content.global.activeLabelClassName, item.activeLabelClassName)}">
                  ${item.headerLabel}
                </AccordionHeader>
                <AccordionContent className="${cn(content.global.contentClassName, item.contentClassName)}">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </AccordionContent>
              </AccordionItem>`
                )}
            </Accordion>
  )
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