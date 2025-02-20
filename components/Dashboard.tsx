import {
  ArchiveBoxIcon,
  ArrowPathRoundedSquareIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  PencilSquareIcon,
  ShareIcon,
  Squares2X2Icon,
  SquaresPlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button } from "aspect-ui/Button";
import { Modal, ModalAction, ModalContent } from "aspect-ui/Modal";
import { Pagination } from "aspect-ui/Pagination";
import { Tooltip, TooltipAction, TooltipContent } from "aspect-ui/Tooltip";
import React from "react";
import { AccordionsData } from "./Global";
import AccordionPreview from "./AccordionPreview";
import Export from "./Export";
// import AccordionPreview from "./AccordionPreview";

interface AccordionDashboardProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  postStatus: 'publish' | 'draft' | 'trash';
  handlePostStatusChange: (status: 'publish' | 'draft' | 'trash') => void;
  accordions: AccordionsData[];
  startCreating: () => void;
  startEditing: (accordion: AccordionsData) => void;
  startDeleting: (id: number, status?: "publish" | "draft" | "trash") => void;
  startCopying: (accordion: AccordionsData) => void;
  // startQuickView: (id: string) => void;
  selectedAccordions: number[];
  setSelectedAccordions: React.Dispatch<React.SetStateAction<number[]>>;
  handleBulkUpdate?: (ids: string[], status: string) => void;
}

const AccordionDashboard: React.FC<AccordionDashboardProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
  postStatus,
  handlePostStatusChange,
  accordions,
  startCreating,
  startEditing,
  startDeleting,
  startCopying,
  // startQuickView,
  selectedAccordions = [],
  setSelectedAccordions,
  // handleBulkUpdate,
}) => {
  // Handle checkbox selection for a single accordion
  const handleSelect = (id: number) => {
    setSelectedAccordions((prev: number[]) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  // Handle "Select All" functionality
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const currentPageIds = accordions.map((accordion) => accordion.id);
      setSelectedAccordions(currentPageIds);
    } else {
      setSelectedAccordions([]);
    }
  };

  // Check if all items on the current page are selected
  const isAllSelected =
    accordions?.length > 0 && selectedAccordions.length === accordions.length;

  return (
    <div className="accordion-dashboard">
      {/* <h2 className="text-lg font-bold mb-4">Accordion Dashboard</h2> */}
      <div className="flex gap-5 items-center">
        <Button
          icon={<Squares2X2Icon className="size-5" />}
          className="mb-4"
          onClick={() => {
            handlePostStatusChange("publish");
          }}>
          Published Items
        </Button>
        <Button
          icon={<ArchiveBoxIcon className="size-5" />}
          className="mb-4"
          onClick={() => {
            handlePostStatusChange("draft");
          }}>
          Drafted Items
        </Button>
        <Button
          icon={<TrashIcon className="size-5" />}
          className="mb-4"
          onClick={() => {
            handlePostStatusChange("trash");
          }}>
          Trashed Items
        </Button>
      </div>
      <Button
        onClick={startCreating}
        icon={<SquaresPlusIcon className="size-5" />}
        className="mb-4">
        Create New
      </Button>
      {selectedAccordions.length > 0 && (
        <div className="flex gap-3 mb-4">
          <Button
            // onClick={() => handleBulkUpdate(selectedAccordions, "publish")}
            className="bg-primary-500">
            Move to Publish
          </Button>
          <Button
            // onClick={() => handleBulkUpdate(selectedAccordions, "draft")}
            className="bg-secondary-500">
            Move to Draft
          </Button>
          <Button
            // onClick={() => handleBulkUpdate(selectedAccordions, "trash")}
            className="bg-danger-500">
            Move to Trash
          </Button>
        </div>
      )}
      <ul className="">
        <li className="flex items-center bg-gray-100 p-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <span className="ml-2 font-bold">Select All</span>
        </li>
        {accordions &&
          accordions.map((accordion, index) => {
            // var parsedData = qs.parse(accordion?.content, { decode: true });
            // const content = Object.keys(parsedData).reduce((acc, key) => {
            // 	const cleanedKey = key.replace(/^amp;/, ""); // Remove the 'amp;' prefix
            // 	acc[cleanedKey] = parsedData[key];
            // 	return acc;
            // }, {});
            const content = accordion?.content;
            const globalOptions = content?.global;
            const items = content?.items;
            // var shortCode = `[aspect_accordions id="${accordion.id}"]`;
            console.log("accordion", accordion);
            return (
              <li
                key={index}
                className="p-4 bg-gray-100 border-b border-b-gray-200 mb-0 hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                <div className="flex justify-between items-center">
                  {/* <div className="flex gap-2 items-center"> */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedAccordions.includes(accordion.id)}
                      onChange={() => handleSelect(accordion.id)}
                    />
                    <p className="font-bold text-sm">{accordion.title}</p>
                  </div>
                  {/* <p className="font-bold text-sm">{accordion.title}</p> */}
                  {/* </div> */}
                  <div className="flex gap-2">
                    {/* {postStatus === "publish" && (
                      <div className="flex items-center gap-2 border border-x-primary-200 rounded-md p-2">
                        <span>{shortCode}</span>
                        <Tooltip direction="top" arrowColor="#a9cdcf">
                          <TooltipAction>
                            <ClipboardDocumentIcon
                              className="size-5"
                              onClick={() =>
                                navigator.clipboard.writeText(shortCode)
                              }
                            />
                          </TooltipAction>
                          <TooltipContent>
                            <p className="text-body1 !text-[11px]">
                              Copy Shortcode
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )} */}
                    {(postStatus === "publish" || postStatus === "draft") && (
                      <Tooltip direction="top" arrowColor="#a9cdcf">
                        <TooltipAction>
                          <Button onClick={() => startEditing(accordion)}>
                            <PencilSquareIcon className="size-5" />
                          </Button>
                        </TooltipAction>
                        <TooltipContent>
                          <p className="text-body1 !text-[11px]">
                            Edit Accordion
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {postStatus !== "trash" && (
                      <Tooltip direction="top" arrowColor="#a9cdcf">
                        <TooltipAction>
                          <Button onClick={() => startCopying(accordion)}>
                            <DocumentDuplicateIcon className="size-5" />
                          </Button>
                        </TooltipAction>
                        <TooltipContent>
                          <p className="text-body1 !text-[11px]">
                            Duplicate Accordion
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    {postStatus === "trash" && (
                      <Tooltip direction="top" arrowColor="#a9cdcf">
                        <TooltipAction>
                          <Button
                            onClick={() =>
                              startDeleting(accordion.id, "draft")
                            }>
                            <ArrowPathRoundedSquareIcon className="size-5" />
                          </Button>
                        </TooltipAction>
                        <TooltipContent>
                          <p className="text-body1 !text-[11px]">
                            Restore Accordion
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip direction="top" arrowColor="#a9cdcf">
                      <TooltipAction>
                        <Button onClick={() => startDeleting(accordion.id)}>
                          <TrashIcon className="size-5" />
                        </Button>
                      </TooltipAction>
                      <TooltipContent>
                        <p className="text-body1 !text-[11px]">
                          {postStatus === "trash"
                            ? "Delete Accordion"
                            : "Move to Trash"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip direction="top" arrowColor="#a9cdcf">
                      <TooltipAction>
                        <Modal>
                          <ModalAction>
                            <EyeIcon className="size-5" />
                          </ModalAction>
                          <ModalContent className="p-4 min-w-[600px] max-h-[600px] overflow-y-auto light-scrollbar">
                            <AccordionPreview
                              globalOptions={globalOptions}
                              items={items}
                              quickView={true}
                            />
                          </ModalContent>
                        </Modal>
                      </TooltipAction>
                      <TooltipContent>
                        <p className="text-body1 !text-[11px]">
                          Preview Accordion
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip direction="top" arrowColor="#a9cdcf">
                      <TooltipAction>
                        <Modal>
                          <ModalAction>
                            <ShareIcon className="size-5" />
                          </ModalAction>
                          <ModalContent className="p-4 min-w-[600px] overflow-y-auto light-scrollbar">
                            <Export
                              accordionData={accordion}
                            />
                          </ModalContent>
                        </Modal>
                      </TooltipAction>
                      <TooltipContent>
                        <p className="text-body1 !text-[11px]">
                          Preview Accordion
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    {/* <Button
										isSmall
										isTertiary
										onClick={() => startQuickView(accordion)}>
										Quick View
									</Button> */}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      {
        <Pagination
          className="mt-4"
          count={totalPages} // Use totalPages from state
          defaultPage={currentPage} // Use currentPage from state
          boundaryCount={2}
          siblingCount={1}
          showFirstLast={totalPages > 5 ? true : false}
          showNextPrev={true}
        numberType="roman"
        firstButton={<ChevronDoubleLeftIcon className="size-4" />}
        lastButton={<ChevronDoubleRightIcon className="size-4" />}
        nextButton={<ChevronRightIcon className="size-4" />}
        previousButton={<ChevronLeftIcon className="size-4" />}
        onChange={handlePageChange}
      />}
      {accordions?.length === 0 && (
        <p className="text-gray-500 text-sm">No accordions available.</p>
      )}
    </div>
  );
};

export default AccordionDashboard;
