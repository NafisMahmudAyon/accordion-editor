'use client'
import { AccordionData } from '@/components/Global';
import IconSelector from '@/components/icons/IconSelector';
import { cn } from '@/components/utils/cn';
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from 'aspect-ui';
import { useEffect, useState } from 'react';

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<AccordionData | null>(null);

  useEffect(() => {
    const fetchAccordion = () => {
      params.then((resolvedParams) => {
        console.log('Resolved Params:', resolvedParams); // Log the params
        const slug = resolvedParams.slug;
        fetch(`/api/accordion/fetch-data?slug=${slug}`)
          .then((res) => {
            console.log(res)
            if (!res.ok) {
              throw new Error('Failed to fetch accordion data');
            }
            return res.json();
          })
          .then((data) => {
            setData(data);
            setContent(data.data[0].content);
          })
          .catch((error) => {
            console.error('Error fetching accordion data:', error);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    };

    fetchAccordion();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Accordion not found</div>;
  }

  const activeItems =
    content?.global?.activeItems?.map((index) => `item-${index + 1}`) || [];

  return <div>

    <Accordion
      activeItem={activeItems}
      iconEnabled={content?.global?.iconEnabled}
      iconPosition={content?.global?.iconPosition}
      className={content?.global?.accordionClassName}
      multiple={content?.global?.multiple}
      reset={true}>
      {content?.items.map((item, index) => {
        return (
          <AccordionItem
            key={index}
            id={`item-${index + 1}`}
            disabled={item.disabled === true ? true : false}>
            <AccordionHeader
              iconEnabled={item.iconEnabled ? item.iconEnabled : content?.global?.iconEnabled}
              iconPosition={item.iconPosition ? item.iconPosition : content?.global?.iconPosition}
              iconClassName={cn(content?.global?.inactiveIconClassName, item.iconClassName)}
              activeIconClassName={cn(content?.global?.activeIconClassName, item.activeIconClassName)}
              activeIcon={
                item.activeIcon.length > 0 ? (
                  <IconSelector
                    iconType={item.activeIconType}
                    iconName={item.activeIcon}
                  />
                ) : (
                  <IconSelector
                    iconType={content?.global?.activeIconType}
                    iconName={content?.global?.activeIcon}
                  />
                )
              }
              inactiveIcon={
                item.inactiveIcon.length > 0 ? (
                  <IconSelector
                    iconType={item.inactiveIconType}
                    iconName={item.inactiveIcon}
                  />
                ) : (
                  <IconSelector
                    iconType={content?.global?.inactiveIconType}
                    iconName={content?.global?.inactiveIcon}
                  />
                )
              }
              className={cn(content?.global?.headerClassName, item.headerClassName)}
              labelClassName={cn(content?.global?.labelClassName, item.labelClassName)}
              activeHeaderClassName={cn(content?.global?.activeHeaderClassName, item.activeHeaderClassName)}
              activeLabelClassName={cn(content?.global?.activeLabelClassName, item.activeLabelClassName)}>
              {item.headerLabel}
            </AccordionHeader>
            <AccordionContent
              className={cn(content?.global?.contentClassName, item.contentClassName)}
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </AccordionContent>
            {/* <AccordionContent
								className={item.contentClassName}
								dangerouslySetInnerHTML={{ __html: item.content }}
							/> */}
          </AccordionItem>
        );
      })}
    </Accordion>
  </div>;
}