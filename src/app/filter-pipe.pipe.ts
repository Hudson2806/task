import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(tasks: [], searchText:string) :any[] {
    if(!tasks) return [];
    if(!searchText) return tasks;
    
    searchText = searchText.toLocaleLowerCase();

    return tasks.filter((task :string) => {
      return task.toLocaleLowerCase().includes(searchText)
    })
  }

}
