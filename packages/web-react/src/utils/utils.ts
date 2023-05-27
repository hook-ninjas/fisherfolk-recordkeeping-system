import { Option } from '../Components/Forms/FormInputFields';

export const splitUpperCase = (item: string | undefined) =>
  item?.match(/[A-Z][a-z]+/g)?.join(' ');

export const getValues = (arr: Option[]) => arr.map((a) => a.value);
