import Link from "next/link";
import { Tabs } from "../Tabs";
import { HeaderContainer } from "./styles";

const Header: React.FC<{ currentTab: string }> = ({ currentTab }) => (
  <HeaderContainer>
        <h1>Mutants</h1>
    <Tabs
      options={[
        { title: 'Heroes', link: '/Heroes' },
        { title: 'Category', link: '/Category' },
      ]}
      currentTab={currentTab}
    />
  </HeaderContainer>
);

export default Header;