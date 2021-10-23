import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '@services/preferences.service';
import { SecurityService } from '@services/security.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedSystem: any;
  selectedLanguage: any;
  selectedPeriodicity: any;
  lang: any;
  measurementSystems: any;
  languages: any;
  periodicities: any;

  constructor(
    private authService: SecurityService,
    private preferences: PreferencesService,
    private preferencesService: PreferencesService,
  ) { }

  ngOnInit() {
    this.lang = this.preferencesService.getLanguage();

    if (this.lang && this.lang.locale == 'es') {
      this.measurementSystems = [
        { label: 'Métrico', value: { id: 1, name: 'metric' } },
        { label: 'Imperial', value: { id: 2, name: 'imperial' } },
      ];

      this.languages = [
        { label: 'English', value: { id: 1, name: 'english', locale: "en" } },
        { label: 'Español', value: { id: 2, name: 'spanish', locale: "es" } },
      ];

      this.periodicities = [
        { label: 'Diario', value: 1 },
        { label: 'Semanal', value: 2 },
        { label: 'Mensual', value: 3 },
      ];
    } else {
      this.measurementSystems = [
        { label: 'Metric', value: { id: 1, name: 'metric' } },
        { label: 'Imperial', value: { id: 2, name: 'imperial' } },
      ];

      this.languages = [
        { label: 'English', value: { id: 1, name: 'english', locale: "en" } },
        { label: 'Español', value: { id: 2, name: 'spanish', locale: "es" } },
      ];

      this.periodicities = [
        { label: 'Daily', value: 1 },
        { label: 'Weekly', value: 2 },
        { label: 'Monthly', value: 3 },
      ];
    }

    this.onLoadPreferences();
  }

  async onLoadPreferences() {
    this.selectedSystem = this.preferences.getMeasurementSystem();
    this.selectedLanguage = this.preferences.getLanguage();
  }

  onLanguageSelected() {
    this.preferences.setLanguage(this.selectedLanguage);
  }

  onMeasurementSelected() {
    this.preferences.setMeasurementSystem(this.selectedSystem);
  }

  onPeriodicitySelect() {
    this.preferences.setPeriodicity(this.selectedPeriodicity);
  }

}
