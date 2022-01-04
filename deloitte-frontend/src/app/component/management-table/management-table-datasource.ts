import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map, filter} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';

// TODO: Replace this with your own data model type
export interface ManagementTableItem {
  name: string;
  id: number;
  age: string;
  year_joined: string;
  title: string;
}

// TODO: replace this with real data from your application
const MANAGEMENT_DATA: ManagementTableItem[] = [
  {
    id: 1,
    name: 'John Thompson',
    age: '69',
    year_joined: '2014',
    title: 'Independent Non-Executive Chairman of the Board'
  }, {
    id: 2,
    name: 'Bradford Smith',
    age: '59',
    year_joined: '2015',
    title: 'President, Chief Legal Officer'
  }, {
    id: 3,
    name: 'Satya Nadella',
    age: '52',
    year_joined: '2014',
    title: 'Chief Executive Officer, Director'
  }, {
    id: 4,
    name: 'William Gates',
    age: '63',
    year_joined: '2014',
    title: 'Founder, Technology Advisor, Director'
  }, {
    id: 5,
    name: 'Amy Hood',
    age: '46',
    year_joined: '2013',
    title: 'Chief Financial Officer, Executive Vice President'
  }, {
    id: 6,
    name: 'Kevin Scott',
    age: '',
    year_joined: '2017',
    title: 'Executive Vice President, Chief Technology Officer'
  }, {
    id: 7,
    name: 'Christopher Capossela',
    age: '48',
    year_joined: '2016',
    title: 'Executive Vice President, Marketing and Consumer Business, and Chief Marketing O' +
        'fficer'
  }, {
    id: 8,
    name: 'Kathleen Hoga',
    age: '52',
    year_joined: '2014',
    title: 'Executive Vice President - Human Resources'
  }, {
    id: 9,
    name: 'Arne Sorenson',
    age: '57',
    year_joined: '2016',
    title: 'Executive Vice President and President - Microsoft Global Sales, Marketing and O' +
        'perations'
  }, {
    id: 10,
    name: 'Margaret Johnson',
    age: '56',
    year_joined: '2014',
    title: 'Executive Vice President - Business Development'
  }, {
    id: 11,
    name: 'Reida Hoffman',
    age: '51',
    year_joined: '2017',
    title: 'Independent Director'
  }, {
    id: 12,
    name: 'Hugh Johnson',
    age: '57',
    year_joined: '2017',
    title: 'Independent Director'
  }, {
    id: 13,
    name: 'Teri List-Stoll',
    age: '55',
    year_joined: '2014',
    title: 'Independent Director'
  }, {
    id: 14,
    name: 'Charles Noski',
    age: '66',
    year_joined: '2003',
    title: 'Independent Director'
  }, {
    id: 15,
    name: 'Helmut Panke',
    age: '72',
    year_joined: '2015',
    title: 'Independent Director'
  }, {
    id: 16,
    name: 'Penny Priztker',
    age: '60',
    year_joined: '2017',
    title: 'Independent Director'
  }, {
    id: 17,
    name: 'Helmut Panke',
    age: '58',
    year_joined: '2014',
    title: 'Independent Director'
  }, {
    id: 18,
    name: 'Sandra Peterson',
    age: '53',
    year_joined: '2017',
    title: 'Independent Director'
  }, {
    id: 19,
    name: 'Arne Sorenson ',
    age: '59',
    year_joined: '2014',
    title: 'Independent Director'
  }, {
    id: 20,
    name: 'John Stanton',
    age: '63',
    year_joined: '2015',
    title: 'Independent Director'
  }
];


/**
 * Data source for the ManagementTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ManagementTableDataSource extends DataSource < ManagementTableItem > {
  data: ManagementTableItem[] = MANAGEMENT_DATA;
  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable < ManagementTableItem[] > {
    // Combine everything that affects the rendered data into one update stream for
    // the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }
  

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ManagementTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ManagementTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'age': return compare(a.age, b.age, isAsc);
        case 'year_joined': return compare(a.year_joined, b.year_joined, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+ a.id, + b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
