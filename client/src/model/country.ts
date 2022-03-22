export default interface ICountry {
    id: bigint;
    name: string;
    code: string;
    region?: string;
    income_group?: string;
    special_notes?: string;
}
