/** @jsx jsx */
import {jsx} from '@emotion/core'

//1-8- using react query to load info for specific book and add rating and note textarea - go to book.exercise

import * as React from 'react'
import debounceFn from 'debounce-fn'
import {FaRegCalendarAlt} from 'react-icons/fa'
import Tooltip from '@reach/tooltip'
import {useParams} from 'react-router-dom'
// 1-8-a- 🐨 you'll need these:
import {useQuery, useMutation, queryCache} from 'react-query'

//1-8-b- commmenting useAsync
// import {useAsync} from 'utils/hooks'
import {client} from 'utils/api-client'
import {formatDate} from 'utils/misc'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'
import {Textarea} from 'components/lib'
import {Rating} from 'components/rating'
import {StatusButtons} from 'components/status-buttons'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: bookPlaceholderSvg,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  loadingBook: true,
}

function BookScreen({user}) {
  const {bookId} = useParams()
  // 1-8-c- 💣 remove the useAsync call here
  // const {data, run} = useAsync()

  // 1-8-e- 🐨 call useQuery here
  // queryKey should be ['book', {bookId}]
  // queryFn should be what's currently passed in the run function below
  const {data: book = loadingBook} = useQuery({
    queryKey: ['book', {bookId}],
    queryFn: () =>
      client(`books/${bookId}`, {token: user.token}).then(data => data.book),
  })
  // 1-8-d - 💣 remove the useEffect here (react-query will handle that now)
  // React.useEffect(() => {
  //   run(client(`books/${bookId}`, {token: user.token}))
  // }, [run, bookId, user.token])

  // 1-8-f-🐨 call useQuery to get the list item from the list-items endpoint
  // queryKey should be 'list-items'
  // queryFn should call the 'list-items' endpoint with the user's token
  //copy query func and list item logic from statusbuttonex-34
  const {data:listItems} = useQuery({
    queryKey: 'list-items',
    queryFn: ()=> client('list-items',{token:user.token}).then(data => data.listItems)
  });
  const listItem = listItems?.find(li => li.bookId === book.id) ?? null;

  //1-8-g- remove this
  // const listItem = null
  
  // 🦉 NOTE: the backend doesn't support getting a single list-item by it's ID
  // and instead expects us to cache all the list items and look them up in our
  // cache. This works out because we're using react-query for caching!

  //1-8-e- remove this also
  // const book = data?.book ?? loadingBook
  const {title, author, coverImageUrl, publisher, synopsis} = book

  return (
    <div>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gridGap: '2em',
          marginBottom: '1em',
          [mq.small]: {
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{width: '100%', maxWidth: '14rem'}}
        />
        <div>
          <div css={{display: 'flex', position: 'relative'}}>
            <div css={{flex: 1, justifyContent: 'space-between'}}>
              <h1>{title}</h1>
              <div>
                <i>{author}</i>
                <span css={{marginRight: 6, marginLeft: 6}}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
            <div
              css={{
                right: 0,
                color: colors.gray80,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: 100,
              }}
            >
              {book.loadingBook ? null : (
                <StatusButtons user={user} book={book} />
              )}
            </div>
          </div>
          <div css={{marginTop: 10, height: 46}}>
            {listItem?.finishDate ? (
              <Rating user={user} listItem={listItem} />
            ) : null}
            {listItem ? <ListItemTimeframe listItem={listItem} /> : null}
          </div>
          <br />
          <p>{synopsis}</p>
        </div>
      </div>
      {!book.loadingBook && listItem ? (
        <NotesTextarea user={user} listItem={listItem} />
      ) : null}
    </div>
  )
}

function ListItemTimeframe({listItem}) {
  const timeframeLabel = listItem.finishDate
    ? 'Start and finish date'
    : 'Start date'

  return (
    <Tooltip label={timeframeLabel}>
      <div aria-label={timeframeLabel} css={{marginTop: 6}}>
        <FaRegCalendarAlt css={{marginTop: -2, marginRight: 5}} />
        <span>
          {formatDate(listItem.startDate)}{' '}
          {listItem.finishDate ? `— ${formatDate(listItem.finishDate)}` : null}
        </span>
      </div>
    </Tooltip>
  )
}

function NotesTextarea({listItem, user}) {
  // 🐨 call useMutation here
  //1-8-h-  the mutate function should call the list-items/:listItemId endpoint with a PUT
  //   and the updates as data. The mutate function will be called with the updates
  //   you can pass as data.
  const [mutate] = useMutation(
    (updates)=> client(`list-items/${updates.id}`,{method:'PUT',data: updates,token:user.token}),
    {onSettled: ()=> queryCache.invalidateQueries('list-items')}
  )
  // 💰 if you want to get the list-items cache updated after this query finishes
  // the use the `onSettled` config option to queryCache.invalidateQueries('list-items')
  // 💣 DELETE THIS ESLINT IGNORE!! Don't ignore the exhaustive deps rule please
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //1-8-i- remove this line
  // const mutate = () => {}
  const debouncedMutate = React.useMemo(
    () => debounceFn(mutate, {wait: 300}),
    [mutate],
  )

  function handleNotesChange(e) {
    debouncedMutate({id: listItem.id, notes: e.target.value})
  }

  return (
    <React.Fragment>
      <div>
        <label
          htmlFor="notes"
          css={{
            display: 'inline-block',
            marginRight: 10,
            marginTop: '0',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          Notes
        </label>
      </div>
      <Textarea
        id="notes"
        defaultValue={listItem.notes}
        onChange={handleNotesChange}
        css={{width: '100%', minHeight: 300}}
      />
    </React.Fragment>
  )
}

export {BookScreen}
