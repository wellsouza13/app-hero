import { useEffect, useState } from "react";
import Link from "next/link";

import { IColumn, IRow, Table } from "@/components/Table";
import { HeaderTablelContainer, TableContainer, Title } from "./styles";
import { Icon } from "@/components/Icon";
import Button from "@/components/Button";

import { confirmAlert } from "react-confirm-alert";
import { useRouter } from "next/router";
import { CategoryData } from "@/types/category";
import { deleteCategory, getAllCategory, getCategory } from "@/services/categoryServices";

export default function Category() {
  const router = useRouter();

  const [categoriesData, setCategoriesData] = useState<CategoryData | null>(null);

  const fetchCategories = async () => {
    const data = await getAllCategory();
    setCategoriesData(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteCategory(id);
              fetchCategories();
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const columns: IColumn[] = [
    { key: "Name", title: "Name", dataIndex: "Name" },
    { key: "Delete", title: "Delete", dataIndex: "delete" },
    { key: "Edit", title: "Edit", dataIndex: "edit" },
  ];

  const rows: IRow[] =
    categoriesData?.Items.map((category) => ({
      key: String(category.Id),
      Name: category.Name,
      delete: (
        <Icon
          cursor="pointer"
          name="RiDeleteBinLine"
          color="red"
          onClick={() => handleDeleteCategory(category.Id)}
          size={20}
        />
      ),
      edit: (
        <Icon
          cursor="pointer"
          name="RiEditFill"
          onClick={() => router.push(`/Category/EditCategory/${category.Id}`)}
        />
      ),
    })) || [];

  return (
    <>
      <HeaderTablelContainer>
        <Title>List of Categories</Title>
        <Link href="/Category/CreateCategory">
          <Button>Create Category</Button>
        </Link>
      </HeaderTablelContainer>
      <TableContainer>
        <Table columns={columns} rows={rows} />
      </TableContainer>
    </>
  );
}
