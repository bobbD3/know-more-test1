const dummyLibraries = [
  {
    id: 1,
    library: 'New Library 1',
    videoPackages: [
      [1, 2],
      [3, 4]
    ] // videoPackages is an array of arrays (each array is a video package)
  },
  {
    id: 2,
    library: 'New Library 2',
    videoPackages: [
      [2, 3, 1, 4, 6, 7, 8, 9],
      [4, 5, 6]
    ]
  },
  {
    id: 3,
    library: 'New Library 3',
    videoPackages: [
      [2, 3, 1, 4],
      [5, 6, 7, 8, 9, 10]
    ]
  },
  {
    id: 4,
    library: 'New Library 4',
    videoPackages: [[1, 2], [3]]
  },
  {
    id: 5,
    library: 'New Library 5',
    videoPackages: [
      [1, 3, 2],
      [4, 5]
    ]
  }
]

export default dummyLibraries
