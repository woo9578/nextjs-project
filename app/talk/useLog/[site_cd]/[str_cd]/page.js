'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
  getKeyValue,
  Input,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  Divider,
  ModalFooter,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useMemo, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";


export default function TalkUseLog(props) {
    const localDate = new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [selectDate, setSelectDate] = useState({
      st_date: localDate,
      end_date: localDate,
    });
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [details, setDetails] = useState({});

    const rowPerPage = 5;
    let list = useAsyncList({
      async load({ signal }) {
        let res = await fetch("/api/talkUseLog", {
          method: "POST",
          body: JSON.stringify({...props.params, selectDate}),
          headers: { "Content-Type": "application/json" },
          signal,
        });
        let json = await res.json();
        setIsLoading(false);
        setPages(Math.ceil(json.data.length / rowPerPage));
        return { items: json.data };
      },
      async sort({ items, sortDescriptor }) {
        return {
          items: items.sort((a, b) => {
            let first = a[sortDescriptor.column];
            let second = b[sortDescriptor.column];
            let cmp =
              (parseInt(first) || first) < (parseInt(second) || second)
                ? -1
                : 1;

            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }

            return cmp;
          }),
        };
      },
    });

    const items = useMemo(() => {
      const start = (page - 1) * rowPerPage;
      const end = start + rowPerPage;

      return list.items.slice(start, end);
    }, [page, list.items]);

    const onChange= ({target:{name,value}})=>{
        setSelectDate({...selectDate ,[name]: value });
    }

    const onSelectReloadClick = async() =>{
      if (selectDate.st_date <= selectDate.end_date) {
        list.reload();
      }else{
        alert("조회 일자를 다시 설정해주세요");
      }
    }
    const rowClick = (item) => {
      setDetails(item);
      onOpenChange(true);
    };


  return (
    <>
      <div className="flex mb-4">
        <Input
          className="flex-initial w-64"
          type="date"
          label="시작 날짜"
          name="st_date"
          value={selectDate.st_date}
          onChange={onChange}
        />
        <span className="text-2xl my-auto">~</span>
        <Input
          className="flex-initial w-64"
          type="date"
          label="조회 날짜"
          name="end_date"
          value={selectDate.end_date}
          onChange={onChange}
        />
        <Button
          className="my-auto"
          color="primary"
          onClick={onSelectReloadClick}
        >
          조회
        </Button>
      </div>
      <Table
        aria-label="Example table with client side sorting pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          table: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="type" allowsSorting maxWidth={"10%"}>
            전송 방식
          </TableColumn>
          <TableColumn key="send_time" allowsSorting maxWidth={"20%"}>
            발송 일자
          </TableColumn>
          <TableColumn
            className="hidden sm:table-cell items-center"
            key="phone"
            allowsSorting
            maxWidth={"10%"}
          >
            발송 번호
          </TableColumn>
          <TableColumn
            className="hidden sm:table-cell items-center"
            key="talk_msg"
            allowsSorting
            maxWidth={"50%"}
          >
            발송 내용
          </TableColumn>
          <TableColumn key="result" allowsSorting maxWidth={"10%"}>
            발송 결과
          </TableColumn>
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={
            !isLoading ? (
              <div>
                {selectDate.st_date} ~ {selectDate.end_date} 사이에 발송된
                내용이 없습니다.
              </div>
            ) : null
          }
        >
          {(item, index) => (
            <TableRow key={item.send_time + item.site_cd}>
              {(columnKey) => (
                <TableCell
                  onClick={() => rowClick(item)}
                  className={
                    columnKey === "phone" || columnKey === "talk_msg"
                      ? "hidden sm:table-cell"
                      : ""
                  }
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className=" flex flex-col gap-1">
                상세내역
              </ModalHeader>
              <ModalBody className="flex-col">
                <p className="text-tiny font-bold">전송 방식 </p>
                <span>{details.type}</span>
                <Divider />
                <p className="text-tiny font-bold">발송 일자</p>
                <span>{details.send_time}</span>
                <Divider />
                <p className="text-tiny font-bold">발송 번호</p>
                <span>{details.phone}</span>
                <Divider />
                <p className="text-tiny font-bold">발송 결과</p>
                <span>{details.result}</span>
                <Divider />
                <p className="text-tiny font-bold">발송 내용</p>
                <span>{details.talk_msg}</span>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}