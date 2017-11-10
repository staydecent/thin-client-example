const items = [
  { title: 'Try out some experimental libraries' },
  { title: 'Do we really need vDom?' },
  { title: 'Pick of some local raspber ries' }
]

export default () =>
  console.log('Todo') ||
  <div>
    <ul>
      {items.map(({title}) => <h3>{title}</h3>)}
    </ul>
  </div>
