import Link from "next/link";
import { TabLink, TabsContainer } from "./styles";

interface TabsProps {
  options: { title: string; link: string }[];
  currentTab: string;
}

const Tabs: React.FC<TabsProps> = ({ options, currentTab }) => (
  <TabsContainer>
    {options.map(({ title, link }) => (
      <Link key={title} href={link} passHref>
        <TabLink active={currentTab === title.toLowerCase()}>{title}</TabLink>
      </Link>
    ))}
  </TabsContainer>
);

export { Tabs };
