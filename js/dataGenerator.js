export function dataGenerator() {
  let data = [
    {
      name: "student1",
      marks: 0,
    },
    {
      name: "student2",
      marks: 0,
    },
    {
      name: "student3",
      marks: 0,
    },
    {
      name: "student4",
      marks: 0,
    },
    {
      name: "student5",
      marks: 0,
    },
    {
      name: "student6",
      marks: 0,
    },
    {
      name: "student7",
      marks: 0,
    },
    {
      name: "student8",
      marks: 0,
    },
    {
      name: "student9",
      marks: 0,
    },
    {
      name: "student10",
      marks: 0,
    },
  ];

  data = data.map((d) => {
    d.marks = Math.floor(Math.random() * 100 + 1);
    return d;
  });
  return data;
}
