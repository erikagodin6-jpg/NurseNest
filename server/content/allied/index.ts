import { materializeAlliedLessons, materializeAlliedQuestions } from "./builders";
import { normalizeAlliedAuthoredQuestion } from "./question-contract";
import { alliedTopics01 } from "./topics-01-rrt-paramedic";
import { alliedTopics02 } from "./topics-02-mlt-pharmacy";
import { alliedTopics03 } from "./topics-03-imaging-sonography";
import { alliedTopics04 } from "./topics-04-rehab-surgical";
import { alliedTopics05 } from "./topics-05-behavioral-him";
import { alliedTopics06 } from "./topics-06-advanced-supported-careers";
import { alliedTopics07 } from "./topics-07-deepening-supported-careers";
import { alliedTopics08 } from "./topics-08-clinical-mastery";
import { alliedTopics09 } from "./topics-09-professional-mastery";
import { diagnosticSonographyTopics10 } from "./topics-10-diagnostic-sonography";
import { diagnosticSonographyAbdominalTopics11 } from "./topics-11-diagnostic-sonography-abdominal";
import { diagnosticSonographyObGynTopics12 } from "./topics-12-diagnostic-sonography-obgyn";
import { diagnosticSonographyVascularTopics13 } from "./topics-13-diagnostic-sonography-vascular";
import { diagnosticSonographySmallPartsTopics14 } from "./topics-14-diagnostic-sonography-small-parts";
import { diagnosticSonographyPediatricTopics15 } from "./topics-15-diagnostic-sonography-pediatric";
import { diagnosticSonographyCardiacGapTopics16 } from "./topics-16-diagnostic-sonography-cardiac-gaps";
import { diagnosticSonographyFetalPediatricEchoTopics17 } from "./topics-17-diagnostic-sonography-fetal-pediatric-echo";

export const alliedAuthoredTopics = [...alliedTopics01,...alliedTopics02,...alliedTopics03,...alliedTopics04,...alliedTopics05,...alliedTopics06,...alliedTopics07,...alliedTopics08,...alliedTopics09,...diagnosticSonographyTopics10,...diagnosticSonographyAbdominalTopics11,...diagnosticSonographyObGynTopics12,...diagnosticSonographyVascularTopics13,...diagnosticSonographySmallPartsTopics14,...diagnosticSonographyPediatricTopics15,...diagnosticSonographyCardiacGapTopics16,...diagnosticSonographyFetalPediatricEchoTopics17];
export const alliedAuthoredLessons = materializeAlliedLessons(alliedAuthoredTopics);
export const alliedAuthoredQuestions = materializeAlliedQuestions(alliedAuthoredTopics).map(normalizeAlliedAuthoredQuestion);
export const ALLIED_AUTHORED_TARGETS = Object.freeze({ minimumTopics:251, lessonsPerTopic:5, minimumLessons:1_255, questionsPerTopic:100, minimumQuestions:25_100 });
function countBy<T>(rows:T[],getKey:(row:T)=>string):Map<string,number>{const counts=new Map<string,number>();for(const row of rows){const key=getKey(row);counts.set(key,(counts.get(key)??0)+1);}return counts;}
export function assertAlliedAuthoredEstate():void{const target=ALLIED_AUTHORED_TARGETS;if(alliedAuthoredTopics.length<target.minimumTopics)throw new Error(`Allied authored topic floor failed: ${alliedAuthoredTopics.length} < ${target.minimumTopics}`);if(alliedAuthoredLessons.length<target.minimumLessons)throw new Error(`Allied authored lesson floor failed: ${alliedAuthoredLessons.length} < ${target.minimumLessons}`);if(alliedAuthoredQuestions.length<target.minimumQuestions)throw new Error(`Allied authored question floor failed: ${alliedAuthoredQuestions.length} < ${target.minimumQuestions}`);const topicIds=new Set<string>();for(const topic of alliedAuthoredTopics){if(topicIds.has(topic.id))throw new Error(`Duplicate Allied topic id: ${topic.id}`);topicIds.add(topic.id);}const lessonsByTopic=countBy(alliedAuthoredLessons,l=>`${l.careerType}\u0000${l.topic}`);const questionsByTopic=countBy(alliedAuthoredQuestions,q=>`${q.careerType}\u0000${q.topic}`);for(const topic of alliedAuthoredTopics){const key=`${topic.careerType}\u0000${topic.topic}`;const lc=lessonsByTopic.get(key)??0;const qc=questionsByTopic.get(key)??0;if(lc!==target.lessonsPerTopic)throw new Error(`${topic.id}: expected ${target.lessonsPerTopic} lessons, found ${lc}`);if(qc!==target.questionsPerTopic)throw new Error(`${topic.id}: expected ${target.questionsPerTopic} questions, found ${qc}`);}}
assertAlliedAuthoredEstate();
