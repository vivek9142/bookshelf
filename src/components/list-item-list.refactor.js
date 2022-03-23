/** @jsx jsx */
import {jsx} from '@emotion/core'

//1-13-g - remove unwanted dependencies
// import {useQuery} from 'react-query';
// import {client} from 'utils/api-client';

//1-13-e - import useListItems
import { useListItems } from 'utils/list-items.exercise';

import {BookListUL} from './lib'
import {BookRow} from './book-row'

function ListItemList({
  user,
  filterListItems,
  noListItems,
  noFilteredListItems,
}) {

  //1-13-F- replace these liones with following lines
  // const {data:listItems} = useQuery({
  //   queryKey: 'list-items',
  //   queryFn: ()=> client('list-items',{token:user.token}).then(data => data.listItems)
  // });

  const listItems = useListItems(user);

  const filteredListItems = listItems?.filter(filterListItems)

  if (!listItems?.length) {
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
          <BookRow user={user} book={listItem.book} />
        </li>
      ))}
    </BookListUL>
  )
}

export {ListItemList}
