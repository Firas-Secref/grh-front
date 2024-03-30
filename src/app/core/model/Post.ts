export  class NewPost{
  offerId?: number;
  offerTitle: string;
  offerRef: string;
  publishDate: Date;
  offerDescription: string;

  constructor(offerTitle: string, offerRef: string, publishDate: Date, offerDescription: string) {
    this.offerTitle = offerTitle;
    this.offerRef = offerRef;
    this.publishDate = publishDate;
    this.offerDescription = offerDescription;
  }
}

export class PostDB extends NewPost{
  statusId: number;
  statusName: string;
  statusColor: string;

  constructor(offerTitle: string, offerRef: string, publishDate: Date, offerDescription: string, statusId: number, statusName: string, statusColor: string) {
    super(offerTitle, offerRef, publishDate, offerDescription);
    this.statusId = statusId;
    this.statusName = statusName;
    this.statusColor = statusColor;
  }
}

export class OfferCategory{
  categoryId: number
  categoryName: string

  constructor(categoryId: number, categoryName: string) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }
}
