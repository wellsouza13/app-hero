import { useState, useEffect } from "react";
import Select from "react-select";

export interface IOption {
  value: string | number;
  label: string;
}

interface IProps {
  fetchOptions: () => Promise<any>;
  onChange: (option: IOption | null) => void;
  value: IOption | null;
}

const AsyncSelect: React.FC<IProps> = ({ fetchOptions, onChange, value }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<IOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const response = await fetchOptions();
      if (active) {
        const formattedResponse = response?.Items.map((item: any) => ({
          value: item.Id,
          label: item.Name,
        }));

        setOptions(formattedResponse);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetchOptions]);

  return (
    <Select
      isLoading={loading}
      isDisabled={loading}
      options={options}
      value={value}
      onChange={onChange}
      onInputChange={setInputValue}
    />
  );
};

export default AsyncSelect;
