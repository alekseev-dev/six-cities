import { SortType } from '../../const';
import { useAppDispatch } from '../../hooks';
import { dataProcessActions } from '../../store/data-process/data-process';

type SelectItemProps = {
  type: SortType;
  currentSortType: (type: SortType) => void;
  setOpenSelect: (openedSelect: boolean) => void;
}

function SelectItem(props: SelectItemProps): JSX.Element {
  const {type, currentSortType, setOpenSelect} = props;
  const dispatch = useAppDispatch();

  return (
    <li
      onClick={() => {
        dispatch(dataProcessActions.setSortType(type));
        currentSortType(type);
        setOpenSelect(false);
      }}
      className={'places__option places__option--active'}
      tabIndex={0}
    >{type}
    </li>
  );
}
export default SelectItem;
