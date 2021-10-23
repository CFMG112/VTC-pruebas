import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SecurityService } from '@app/services/security.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: MessageService,

  ) { }

  faq: any;
  faqId: any;
  action: string;
  display: boolean;
  confirm: string;



  ngOnInit() {

    this.faqId = this.route.snapshot.paramMap.get('id');
    if (this.faqId) {
      this.action = 'edit';
      this.findFaq();
    } else {
      this.action = 'create';
      this.faq = {};
    }

  }

  save() {

    if (this.action == 'edit') {
      this.dataService.updateOne('/faqs', this.faqId, this.faq).then(() => {
        this.router.navigate(['/catalogs/faqs'], { relativeTo: this.route });
      });
    }
    if (this.action == 'create') {
      this.dataService.insertOne('/faqs', this.faq).then(() => {
        this.router.navigate(['/catalogs/faqs'], { relativeTo: this.route });
      }, (ex) => {
        this.toast.add({
          severity: 'warn',
          detail: ex.error.message
        });
      });
    }
  }


  findFaq() {
    this.dataService.findById('/faqs/id', this.faqId).then(data => {
      this.faq = data;
      console.log(this.faq);
    }, (err) => {
      console.error(err);
    })
  }



}
