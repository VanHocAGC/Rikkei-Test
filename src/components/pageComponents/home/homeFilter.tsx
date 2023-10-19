import { useAppSelector } from 'app/hooks';
import Button from 'components/common/Button';
import Select from 'components/common/Select';
import FlexCenter from 'components/common/center';
import { ISelect } from 'interfaces';
import { ToSelectOption } from 'utils';

export interface HomeFilterProps {
  selected: Array<ISelect>;
  onSelect: (select: Array<ISelect>) => void;
  onFilter: () => void;
}

export default function HomeFilter({
  selected,
  onSelect,
  onFilter,
}: HomeFilterProps) {
  const productInfo = useAppSelector((state) => state.product);
  const handleFilter = (value: any) => {
    onSelect(value);
  };
  return (
    <FlexCenter className="gap-x-6">
      <Select
        title="Category"
        name="category"
        options={ToSelectOption(productInfo.categoryList)}
        value={selected}
        onChange={(value) => handleFilter(value)}
        placeholder="Select Category..."
      />
      <Button title="Filter" onClick={() => onFilter()} />
    </FlexCenter>
  );
}
