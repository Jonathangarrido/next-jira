interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'PRENDIENTE: Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'IN_-PROGRESS: Sint doloremque autem voluptatum magnam cum iste optio ab similique dolore',
      status: 'in-progress',
      createdAt: Date.now() - 100000,
    },
    {
      description:
        'FINISHED: Exercitationem nam consequatur aperiam unde molestias, eaque facere itaque labore consequuntur?',
      status: 'finished',
      createdAt: Date.now() - 10000,
    },
  ]
}
