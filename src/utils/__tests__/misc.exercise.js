//1-1-a - import formatDate 
import {formatDate} from '../misc';

//1-1-b- remove the todo here 
// test.todo('formatDate formats the date to look nice',()=>{
test('formatDate formats the date to look nice',()=>{
    expect(formatDate(new Date('October 18,1988'))).toBe('Oct 88')
});

