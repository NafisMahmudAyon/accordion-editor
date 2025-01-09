'use client';
import AccordionGlobalOptions from '@/components/AccordionGlobalOptions';
import AccordionItemsEditor from '@/components/AccordionItemsEditor';
import AccordionPreview from '@/components/AccordionPreview';
import Dashboard from '@/components/Dashboard';
import { defaultData } from '@/components/defaultData';
import { AccordionData, AccordionsData, ItemOptionsType } from '@/components/Global';
import { useUser } from '@clerk/nextjs';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Accordion, AccordionContent, AccordionHeader, AccordionItem } from 'aspect-ui/Accordion';
import { Button } from 'aspect-ui/Button';
import { useCallback, useEffect, useState } from 'react';

const Page = () => {
  const { user } = useUser();
  const [accordions, setAccordions] = useState<AccordionsData[]>([]);
  const [currentAccordion, setCurrentAccordion] = useState<AccordionsData | null>(null);
  const [selectedAccordions, setSelectedAccordions] = useState<number[]>([]);
  const [isAccordion, setIsAccordion] = useState<boolean>(true);
  const [accordionId, setAccordionId] = useState<number | null>(null);
  const [accordionData, setAccordionData] = useState<AccordionData | null>(null);
  const [title, setTitle] = useState<string>(""); // State for the accordion title
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [postStatus, setPostStatus] = useState<"publish" | "draft" | "trash">("publish");
  const [currentPage, setCurrentPage] = useState<number>(1); // Track the current page
  const [totalPages, setTotalPages] = useState<number>(1); // Track total number of pages
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | string | null>(null);

  console.log(accordions)
  console.log(currentAccordion, loading, error)

  const fetchAccordions = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/accordion/fetch?user_id=${user.id}&status=${postStatus}&page=${currentPage}&limit=5`
      );

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to fetch accordions");
      }

      const result = await response.json();
      const { data, meta: { totalPages } } = result;

      setAccordions(data || []);
      setTotalPages(totalPages);

    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      console.error("Error fetching accordions:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, postStatus, currentPage]);

  useEffect(() => {
    fetchAccordions();
  }, [fetchAccordions]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startCreating = () => {
    console.log('Starting to create a new accordion...');
    // Add logic to start creating a new accordion
    setCurrentAccordion(null);
    setTitle("New Accordion"); // Default title for new accordion
    setAccordionData(defaultData);
  };

  const startEditing = (accordion: AccordionsData) => {
    setCurrentAccordion(accordion);
    setTitle(accordion.title);
    setAccordionData(accordion.content);
    setAccordionId(accordion.id);
  };

  const startDeleting = async (id: number, status: "publish" | "draft" | "trash" = "trash") => {
    try {
      console.log("Starting to delete an accordion...");

      if (postStatus === "publish" || postStatus === "draft") {
        // Update the accordion status to "trash"
        const response = await fetch(`/api/accordion/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status: "trash" }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error updating accordion status:", errorData.error);
          alert(`Error: ${errorData.error}`);
          return;
        }
        fetchAccordions()
        alert("Accordion moved to trash successfully!");
      } else if (postStatus === "trash" && status !== "draft") {
        // Show confirmation alert before deleting
        const confirmDelete = window.confirm(
          "This action will permanently delete the accordion. Are you want to proceed?"
        );

        if (!confirmDelete) {
          console.log("Accordion deletion canceled by user.");
          return;
        }

        // Delete the accordion
        const response = await fetch(`/api/accordion/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting accordion:", errorData.error);
          alert(`Error: ${errorData.error}`);
          return;
        }
        alert("Accordion deleted successfully!");
        fetchAccordions()
      } else if (status === "draft") {
        // Delete the accordion
        const response = await fetch(`/api/accordion/update-status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, status }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error updating accordion status:", errorData.error);
          alert(`Error: ${errorData.error}`);
          return;
        }
        alert("Accordion restored successfully!");
        fetchAccordions()
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };


  const startCopying = async (accordion: AccordionsData) => {
    try {
      console.log('Starting to copy an accordion...');

      // Make a POST request to the duplication API
      const response = await fetch('/api/accordion/duplicate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: accordion.id }), // Pass the accordion ID
      });

      if (!response.ok) {
        // Handle errors returned by the API
        const errorData = await response.json();
        console.error('Error duplicating accordion:', errorData.error);
        alert(`Error: ${errorData.error}`);
        return;
      }

      // Parse and log the response data
      const duplicatedAccordion = await response.json();
      console.log('Accordion duplicated successfully:', duplicatedAccordion);

      // Optionally, add logic to update the UI with the duplicated accordion
      alert('Accordion duplicated successfully!');
    } catch (error) {
      // Handle unexpected errors
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };


  // const handleBulkUpdate = () => {
  //   console.log('Performing bulk update...');
  //   // Add logic to perform bulk update on selected accordions
  // };

  // const saveAccordion = async (status: "publish" | "draft" | "trash") => {
  //   setSaveLoading(true);
  //   try {
  //     const { error } = await supabase.from('accordion').insert({
  //       user_id: user.id, // Assuming 'user_id' is the column in your table
  //       title: title, // Replace with the actual title value
  //       content: accordionData, // Replace with the actual options value
  //       status: status, // Replace with the actual status value
  //     });
  //     if (error) {
  //       console.error('Error saving accordion:', error);
  //     } else {
  //       console.log('Accordion saved successfully');
  //     }
  //   } catch (error) {
  //     console.error('Error saving accordion:', error);
  //   } finally {
  //     setSaveLoading(false);
  //   }
  // };

  const saveAccordion = async (status: "publish" | "draft" | "trash") => {
    setSaveLoading(true);

    console.log("accordionId" + accordionId);

    try {
      // Assuming `accordionId` determines if the accordion is already in the database
      if (accordionId) {
        // Update API
        const response = await fetch(`/api/accordion/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: accordionId, // Existing accordion ID
            status,
            content: accordionData, // Pass the accordion data you want to save
            title,
          }),
        });

        const result = await response.json();

        setAccordionId(null);
        setAccordionData(null);
        setLoading(true);
        fetchAccordions();
        setLoading(false);

        if (!response.ok) {
          throw new Error(result.message || "Failed to update accordion");
        }

        console.log("Accordion updated successfully", result);
      } else {
        // Create API
        const response = await fetch(`/api/accordion/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            user_id: user?.id,
            title,
            content: accordionData, // Pass the accordion data you want to save
          }),
        });

        const result = await response.json();

        setAccordionId(null);
        setAccordionData(null);

        if (!response.ok) {
          throw new Error(result.message || "Failed to create accordion");
        }

        console.log("Accordion created successfully", result);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error saving accordion:", err);
      } else {
        setError("An unknown error occurred");
        console.error("Error saving accordion:", err);
      }
    } finally {
      setSaveLoading(false);
    }
  };


  const updateGlobalOption = (key: string, value: string | boolean | number | number[]) => {
    setAccordionData((prevAccordionData) => {
      if (prevAccordionData) {
        return {
          ...prevAccordionData,
          global: {
            ...prevAccordionData.global,
            [key]: value,
          },
          items: prevAccordionData?.items || [], // Ensure items is always an array
        };
      } else {
        return prevAccordionData;
      }
    });
  };

  const updateItemOption = (index: number, key: string, value: string | boolean | number | number[]) => {
    setAccordionData((prevAccordionData) => {
      if (prevAccordionData) {
        return {
          ...prevAccordionData,
          items: prevAccordionData.items.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
        };
      } else {
        return prevAccordionData;
      }
    });
  };

  const updateFullItem = (updatedItems: ItemOptionsType[]) => {
    setAccordionData((prevAccordionData) => {
      if (prevAccordionData) {
        return {
          ...prevAccordionData,
          items: updatedItems,
        };
      } else {
        return prevAccordionData;
      }
    });
  }

  const cancelEditing = () => {
    setCurrentAccordion(null);
    setAccordionData(null);
  };

  const addItem = (index: number) => {
    setAccordionData((prevAccordionData) => {
      if (prevAccordionData) {
        return {
          ...prevAccordionData,
          items: [
            ...prevAccordionData.items,
            {
              id: "item-" + (index + 1),
              content: "",
              disabled: false,
              activeIcon: "",
              headerLabel: "Accordion" + (index + 1),
              iconEnabled: true,
              iconPosition: undefined,
              inactiveIcon: "",
              iconClassName: "size-6",
              activeIconType: "",
              labelClassName: "",
              activeIconClassName: "size-6",
              headerClassName: "",
              contentClassName: "",
              inactiveIconType: "",
              accordionClassName: "",
              navigationClassName: "",
              activeLabelClassName: "",
              activeHeaderClassName: "",
            },
          ],
        };
      } else {
        return prevAccordionData;
      }
    });
  };

  console.log("currentPage: ", currentPage);

  const handlePostStatusChange = (status: "publish" | "draft" | "trash") => {
    setPostStatus(status);
    setCurrentPage(1);
  };

  if (!user) {
    return <div>Please log in to see your accordions.</div>;
  }

  return (
    <div className='container mx-auto'>
      <h1>Your Accordions</h1>
      { /* <AccordionPreview
        className="flex-1 overflow-y-scroll"
        globalOptions={options.global}
        items={options.items}
        updateItem={updateItem}
      /> */ }

      {!accordionData && <Dashboard
        // key={currentPage}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        accordions={accordions}
        postStatus={postStatus}
        handlePostStatusChange={handlePostStatusChange}
        startCreating={startCreating}
        startEditing={startEditing}
        startDeleting={startDeleting}
        startCopying={startCopying}
        selectedAccordions={selectedAccordions}
        setSelectedAccordions={setSelectedAccordions}
      // handleBulkUpdate={handleBulkUpdate}
      />}
      {accordionData && (
        <>
          <div className="aspect-accordion-editor flex gap-5 max-h-[700px] h-[70vh] relative">
            <aside className="w-[30%] max-w-[300px] sticky top-0 font-poppins overflow-y-auto light-scrollbar pr-2">
              {/* <button onClick={() => {
                //clipboard the options
                navigator.clipboard.writeText(JSON.stringify(accordionData));
                alert("Options copied to clipboard!");
              }}>Copy</button> */}
              {/* Title Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Accordion Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Enter accordion title"
                />
              </div>
              <Accordion>
                <AccordionItem
                  id="item-1"
                  className="border-primary-200 dark:border-primary-200">
                  <AccordionHeader
                    className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
                    activeHeaderClassName="border-b">
                    <h3 className="text-h6 !text-[13px]">Global Options</h3>
                  </AccordionHeader>
                  <AccordionContent className="py-3 px-3 border-0 pb-3 bg-transparent dark:bg-transparent space-y-3">
                    <AccordionGlobalOptions
                      globalOptions={accordionData.global}
                      isAccordion={isAccordion}
                      setIsAccordion={setIsAccordion}
                      itemsLength={accordionData.items.length}
                      updateGlobalOption={updateGlobalOption}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  id="item-2"
                  className="border-primary-200 dark:border-primary-200">
                  <AccordionHeader
                    className="bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent pl-2 py-2 font-medium text-primary-900 dark:text-primary-900"
                    activeHeaderClassName="border-b">
                    <h3 className="text-h6 !text-[13px]">Items Options</h3>
                  </AccordionHeader>
                  <AccordionContent className="py-3 px-3 border-0 pb-3 space-y-2 bg-transparent dark:bg-transparent">
                    <AccordionItemsEditor
                      items={accordionData.items}
                      updateItem={updateItemOption}
                      addItem={() => addItem(accordionData.items.length)}
                      updateFullItem={updateFullItem}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </aside>
            <AccordionPreview
              className="flex-1 overflow-y-scroll"
              globalOptions={accordionData.global}
              items={accordionData.items}
              updateItem={updateItemOption}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button
              icon={<CheckCircleIcon className="size-5" />}
              loading={saveLoading}
              onClick={() => saveAccordion("publish")}>
              Save Accordion
            </Button>
            <Button
              icon={<CheckCircleIcon className="size-5" />}
              loading={saveLoading}
              onClick={() => saveAccordion("draft")}>
              Save as Draft
            </Button>
            <Button
              icon={<XCircleIcon className="size-5" />}
              onClick={cancelEditing}>
              Cancel Editing
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;