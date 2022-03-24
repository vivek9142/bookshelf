/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useListItems} from 'utils/list-items'
import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
  // 1-3-m- 🐨 no longer need to accept the user as a prop
  // user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {
  // 1-3-n- 🐨 remove the user from this call
  const listItems = useListItems()

  const filteredListItems = listItems.filter(filterListItems)

  if (!listItems.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div css={{marginTop: '1em', fontSize: '1.2em'}}>
        {noFilteredListItems}
      </div>
    )
  }

  return (
    <BookListUL>
      {filteredListItems.map(listItem => (
        <li key={listItem.id}>
          <BookRow
            // 1-3-n- 💣 remove the user prop here
            // user={user}
            book={listItem.book}
          />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}
