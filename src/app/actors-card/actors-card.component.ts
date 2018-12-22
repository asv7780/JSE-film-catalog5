import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-actors-card',
  templateUrl: './actors-card.component.html',
  styleUrls: ['./actors-card.component.scss']
})
export class ActorsCardComponent implements OnInit {
  actorId: number;
  externalId: number;
  isLoad = false;
  actorCard: any;
  actorFilms = [];
  gender: string;
  detailsData: any;
  creditsData: any;


  constructor(public apiService: ApiService,
              private route: ActivatedRoute) { }
  getActor() {
    this.isLoad = true;
    this.apiService.getActorExternalId(this.actorId).subscribe(
      (external: any) => {
        this.externalId = external;
        if (this.externalId) {
          this.apiService.findActPropById(this.externalId).subscribe(
            (root: any) => {
              this.actorCard = root.person_results;
              this.actorFilms = this.actorCard[0].known_for;
              this.isLoad = false;
              console.log(root);
              console.log(this.actorCard);
              console.log(this.externalId);
              console.log(this.actorFilms);
            },
            err => {
              console.log('error film');
            }
          );
        } else {
          this.getDetails();
        }
      },
      err => {
        console.log('error ext');
      }
    );
  }

  getDetails() {
    this.apiService.getActorDetails(this.actorId).subscribe(
      (details: any) => {
        this.detailsData = details;
        this.actorCard = details;
      },
    err => {
      console.log('error film');
    }
    );
  }

  getCastInMovies() {
    this.apiService.getActorsMovieCredits(this.actorId).subscribe(
      (credits: any) => {
        this.creditsData = credits['cast'].splice(0, 12);
        console.log(this.creditsData);
      },
      err => {
        console.log('error film');
      }
    );
  }
  getAge(year) {
return new Date().getFullYear() - year;
  }
  getDeathAge(d, b) {
    return d - b ;
  }
  getGender(gen) {
    const male = 'male';
    const female = 'female';
    (gen === 1) ? this.gender = female : this.gender = male;
    return this.gender;
  }

  ngOnInit() {
    this.actorId = this.route.snapshot.params['id'];
    this.getActor();
    this.getDetails();
    this.getCastInMovies();
  }

}
