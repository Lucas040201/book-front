import {SortEnum} from '../enums/sort.enum';

export default interface FormFilter {
  search?: string;
  sort: SortEnum;
}
