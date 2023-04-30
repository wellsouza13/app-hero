import React, { useState } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import {
  BodyTdStyled,
  CollapseContent,
  CollapseItem,
  CollapseTitle,
  ContainerWrapperStyled,
  EmptyWrapperStyled,
  LoadingWrapperStyled,
  TableBottomContainerStyled,
  TableWrapper,
} from "./styles";
import { Icon } from "../Icon";

export interface IColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
}

export interface IRow {
  [key: string]: any | JSX.Element | { text: string; color: string };
  key: string;
  onClickAction?: () => void;
}

export interface ITable {
  columns: Array<IColumn>;
  rows: Array<IRow>;
  darkMode?: boolean;
  fixedHeader?: boolean;
  onActionClick?: (rowKey: string) => void;
  onBottomReached?: () => void;
  renderBottomElement?: JSX.Element;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyData?: {
    height?: number;
    title: string;
    subtitle: string;
  };
  onClickRow?: (any: any) => void;
  className?: string;
}

const Table: React.FC<ITable> = ({
  columns,
  rows,
  darkMode,
  fixedHeader = true,
  onBottomReached = () => {
    return;
  },
  renderBottomElement,
  onClickRow,
  onActionClick = () => {},
  className,
  isEmpty,
  emptyData = {
    height: 400,
    title: "nenhum heroi",
    subtitle: "",
  },
  isLoading,
}) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleRowClick = (rowKey: string) => {
    setExpandedRows((prevState) =>
      prevState.includes(rowKey)
        ? prevState.filter((key) => key !== rowKey)
        : [...prevState, rowKey]
    );
    if (onClickRow) {
      onClickRow(rowKey);
    }
  };

  return (
    <BottomScrollListener
      onBottom={
        isEmpty || isLoading
          ? () => {
              return;
            }
          : onBottomReached
      }
    >
      {isLoading ? (
        <LoadingWrapperStyled>carregando...</LoadingWrapperStyled>
      ) : isEmpty ? (
        <EmptyWrapperStyled containerHeight={emptyData.height}>
          <div className="iconBox">
            <Icon name="RiMistLine" size={50} color="#E5E5E5" />
          </div>
          <strong>{emptyData.title}</strong>
          <span>{emptyData.subtitle}</span>
        </EmptyWrapperStyled>
      ) : (
        (scrollRef: any) => (
          <ContainerWrapperStyled ref={scrollRef} className={`${className}`}>
            <TableWrapper
              className={`tableWrapper ${darkMode && "dark"}`}
              cellSpacing={0}
            >
              <thead className="tableHeader">
                <tr>
                  {columns.map((item: IColumn) => (
                    <th
                      style={{ width: `${item.width}%` }}
                      key={`header-column-${item.key}-${item.dataIndex}`}
                      className={`${fixedHeader && "fixed"} ${
                        darkMode && "dark"
                      }`}
                    >
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tableBody">
                {rows.map((item: any) => (
                  <>
                    <tr
                      key={`header-row-${item.key}`}
                      // onClick={() => handleRowClick(item.key)}
                    >
                      {columns.map((column, index) => (
                        <BodyTdStyled
                          key={`row-${index}-${item.key}`}
                          disabled={item.disabled}
                          style={{
                            color: item[column.dataIndex].color,
                          }}
                        >
                          {item[column.dataIndex].text ||
                            item[column.dataIndex]}
                        </BodyTdStyled>
                      ))}
                    </tr>
                    {expandedRows?.includes(item.key) && (
                      <tr>
                        <td colSpan={columns.length}>
                          <CollapseContent>
                            <CollapseItem>
                              <CollapseTitle>ID:</CollapseTitle> {item?.Id}
                            </CollapseItem>
                            <CollapseItem>
                              <CollapseTitle>Name:</CollapseTitle> {item?.Name}
                            </CollapseItem>
                            <CollapseItem>
                              <CollapseTitle>Active:</CollapseTitle>{" "}
                              {item?.Active ? "Yes" : "No"}
                            </CollapseItem>
                            <CollapseItem>
                              <CollapseTitle>Category:</CollapseTitle>
                            </CollapseItem>
                            <CollapseItem>
                              <CollapseTitle>ID:</CollapseTitle>{" "}
                              {item?.Category?.Id}
                            </CollapseItem>
                            <CollapseItem>
                              <CollapseTitle>Name:</CollapseTitle>{" "}
                              {item?.Category?.Name}
                            </CollapseItem>
                          </CollapseContent>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </TableWrapper>
            {renderBottomElement && (
              <TableBottomContainerStyled>
                {renderBottomElement}
              </TableBottomContainerStyled>
            )}
          </ContainerWrapperStyled>
        )
      )}
    </BottomScrollListener>
  );
};

export { Table };
