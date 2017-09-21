let els = []
for (var i = 1; i < 7; i++) {
  for (var j = 0; j < i; j++) {
    if(i % j === 0) {
      els.push({ data: { id: String(i) + String(j), source: String(i), target: String(j) } })
    }
  }

  els.push({
    data: { id: String(i) }
  })
}

var cy = cytoscape({
  container: document.getElementById('cy'),
  elements: els,
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'cose'
  }
});
