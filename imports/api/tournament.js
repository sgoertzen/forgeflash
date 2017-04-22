import { Mongo } from 'meteor/mongo';
 
export const Tournament = new Mongo.Collection('tournament');

// Fields: Started, TimeAllowed, TimeRemaining
