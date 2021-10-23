import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.css']
})
export class FaqListComponent implements OnInit {

  constructor(private dataService: DataService,
    private toast: MessageService
  ) { }

  filter: any;
  faqs: any[];
  faq: any;
  display: boolean;
  searchFilterDelay: any;

  ngOnInit() {
    this.onFind({});
  }


  onFind(params: Object) {
    this.dataService.findByFilter('/faqs', params).then(res => {
      this.faqs = res;
    },
      error => {
        console.log(error);
        this.toast.add({ severity: 'error', summary: 'Error', detail: error.error.message })
      })

  }

  onDeleteDialog(faq: any) {
    this.faq = faq;
    this.display = true;
  }

  delete(id: String) {
    this.dataService.deleteOne('/faqs', id).then(_data => {
      this.onFind({});
    }, (e) => {
      this.toast.add({
        severity: 'warn',
        detail: e.error.message,
      });
    });
    this.display = false;
  }


  onFilter() {
    clearTimeout(this.searchFilterDelay);
    this.searchFilterDelay = setTimeout(() => {
      this.onFind({
        answer: this.filter,
        question: this.filter,
      });
    }, 500);
    
  }

}
