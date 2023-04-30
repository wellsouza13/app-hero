import { useEffect, useState } from "react";
import Link from "next/link";
import { deleteHeroe, getHeroes } from "@/services/heroesServices";
import { HeroesData } from "@/types/heroes";
import { IColumn, IRow, Table } from "@/components/Table";
import { HeaderTablelContainer, TableContainer, Title } from "./styles";
import { Icon } from "@/components/Icon";
import Button from "@/components/Button";

import { confirmAlert } from "react-confirm-alert";
import { useRouter } from "next/router";

export default function Heroes() {
  const router = useRouter();

  const [heroesData, setHeroesData] = useState<HeroesData | null>(null);

  const fetchHeroes = async () => {
    const data = await getHeroes();
    setHeroesData(data);
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const handleDeleteHero = async (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this hero?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await deleteHeroe(id);
              fetchHeroes();
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
    { key: "Active", title: "Active", dataIndex: "Active" },
    { key: "Category.Name", title: "Category", dataIndex: "Category.Name" },
    { key: "Delete", title: "Delete", dataIndex: "delete" },
    { key: "Edit", title: "Edit", dataIndex: "edit" },
  ];

  const rows: IRow[] =
    heroesData?.Items.map((hero) => ({
      key: String(hero.Id),
      Name: hero.Name,
      Active: hero.Active ? "Sim" : "Nao",
      "Category.Name": hero.Category?.Name,
      action: (handleRowClick: any) => (
        <Icon
          cursor="pointer"
          name="RiArrowDropDownLine"
          size={25}
          onClick={() => handleRowClick(hero.Id)}
        />
      ),
      delete: (
        <Icon
          cursor="pointer"
          name="RiDeleteBinLine"
          color="red"
          onClick={() => handleDeleteHero(hero.Id)}
          size={20}
        />
      ),
      edit: (
        <Icon
          cursor="pointer"
          name="RiEditFill"
          onClick={() => router.push(`/Heroes/EditHero/${hero.Id}`)}
        />
      ),
    })) || [];

  return (
    <>
      <HeaderTablelContainer>
        <Title>List of Heroes</Title>
        <Link href="/Heroes/CreateHero">
          <Button>Create Hero</Button>
        </Link>
      </HeaderTablelContainer>
      <TableContainer>
        <Table columns={columns} rows={rows} />
      </TableContainer>
    </>
  );
}
