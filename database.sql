CREATE TABLE tasks(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"status" VARCHAR (50) NOT NULL DEFAULT 'Not Done!'
  ); 
  
  INSERT INTO "tasks"("task", "status") VALUES ('Do the dishes');
  INSERT INTO "tasks"("task", "status") VALUES ('Vacuum the living room');
  INSERT INTO "tasks"("task", "status") VALUES ('Buy vegetables for dinner on Monday');
  INSERT INTO "tasks"("task", "status") VALUES ('Clean the bathroom');
  INSERT INTO "tasks"("task", "status") VALUES ('Take out the garbage');
  INSERT INTO "tasks"("task", "status") VALUES ('Email Susan');
  
  SELECT * FROM "tasks"