const mock = [
  {
    lat: 59.921830,
    lng: 30.352232,
  },
  {
    lat: 59.921580,
    lng: 30.352785,
  },
  {
    lat: 59.921263,
    lng: 30.353600,
  },
  {
    lat: 59.920838,
    lng: 30.352613,
  },
  {
    lat: 59.920569,
    lng: 30.351937,
  },
  {
    lat: 59.919977,
    lng: 30.350381,
  },
  {
    lat: 59.920466,
    lng: 30.348954,
  },
  {
    lat: 59.921047,
    lng: 30.350317,
  },
  {
    lat: 59.921493,
    lng: 30.351379,
  },
];

function makeIterator(array) {
  let nextIndex = 0;

  return {
    next: function() {
      if (nextIndex >= array.length) {
        nextIndex = 0;
      }

      return array[nextIndex++];
    },
  };
}

module.exports = makeIterator(mock);
