interface Col {
    id: number;
    label: string;
    className: string;
    align: "left" | "center" | "right";
}


export const DataColom: Col[] = [
    {
        id: 1,
        label: 'Name',
        className: 'dataCol',
        align: 'left',
    },
    {
        id: 2,
        label: 'Email',
        className: 'dataCol',
        align: 'center',
    },
    {
        id: 3,
        label: 'Number',
        className: 'dataCol',
        align: 'center',
    },
    {
        id: 4,
        label: 'Action',
        className: 'dataCol',
        align: 'right',
    },
]