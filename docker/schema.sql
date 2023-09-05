BEGIN;

SET client_encoding = 'LATIN1';

CREATE TABLE user_ (
  id text NOT NULL,
  name text,
  bio text,
  profile_picture text,

  PRIMARY KEY(id)
);

CREATE TABLE recipe_ (
  id integer GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  description text NOT NULL,
  image_src text NOT NULL,
	serves integer NOT NULL,
	cook_time integer NOT NULL,
	prep_time integer NOT NULL,
  ingredients text [] NOT NULL,
  steps text [] NOT NULL,
  author_id text NOT NULL,

  PRIMARY KEY(id),
  CONSTRAINT fk_user_id
    FOREIGN KEY(author_id)
    REFERENCES user_(id)
);

CREATE TABLE likes_ (
  recipe_id integer NOT NULL,
  user_id text NOT NULL,

  PRIMARY KEY(recipe_id, user_id),
  CONSTRAINT fk_recipe_id
    FOREIGN KEY(recipe_id)
    REFERENCES recipe_(id),

  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES user_(id)
);

INSERT INTO user_ (id, name, bio, profile_picture) VALUES (
  'mCXzOblK4hOK9agu2daZeS4ssXf2', 
  'Josh Smith', 
  'Hey there, I''m Josh Smith—a modern-day explorer on a mission to unveil the Earth''s hidden gems. Armed with my trusty camera and an insatiable curiosity, I roam far and wide, freezing breathtaking landscapes in time and unraveling the intricate tapestry of cultures that make our world so diverse. My background in anthropology fuels my passion for understanding the human story, and I''m not content with surface-level snapshots—I aim to capture the emotions, struggles, and triumphs that connect us all. Through my lens, I strive to not only showcase the world''s beauty but also to ignite a fire in others to cherish and safeguard our planet''s most precious treasures.',
   'cqnnoeb36f8fzxbt6xj0'
   );
   
INSERT INTO user_ (id, name, bio, profile_picture) VALUES (
  'iBy34ne2HvOwXX5uClbqlskHAvC2', 
  'Josh Lee', 
  'Hey, I''m Josh Lee, and if you peek into my world, you''ll find lines of code weaving the fabric of my existence. I live and breathe software engineering, and there''s nothing quite like the thrill of translating intricate algorithms into elegant solutions. Staying ahead in this rapidly evolving tech landscape is my game, and I play to win. I''m all about open-source vibes, believing that the digital realm should be a collaborative space for innovation. My keyboard is my weapon, and with it, I''m shaping a future where technology isn''t just a tool, but a force that empowers us all.', 
  'dmtc5z0c9ztdz5oz2hxl'
  );

INSERT INTO recipe_ (name, description, image_src, serves, cook_time, prep_time, ingredients, steps, author_id) VALUES (
  'Shoyu Ramen',
  'The best ramen recipe',
  'recipe/rice_xnmqdq',
  2,
  5,
  5,
  ARRAY[
    '1;kg;pork belly',
    '1;l;pork stock',
    '500;g;udon'
  ],
  ARRAY[
    'Boil pork belly',
    'Cook noodles in broth',
    'serve'
  ],
  'iBy34ne2HvOwXX5uClbqlskHAvC2'
);

INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Creamy Tomato Basil Soup', 'A comforting and flavorful soup made with ripe tomatoes, fresh basil, and a touch of cream.', 6, 30, 15, ARRAY['8;ripe;tomatoes', '1;pc;onion', '2;cloves;garlic', '.5;cup;fresh basil leaves', '.25;cup;heavy cream', '1;cup;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Preheat the oven to 400°F (200°C).', 'Roast the tomatoes, onion, and garlic with olive oil, salt, and pepper for 20 minutes.', 'Blend the roasted ingredients with basil until smooth.', 'Transfer the mixture to a pot, add cream, and heat until warmed through.', 'Serve with a garnish of fresh basil.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Grilled Veggie Quesadillas', 'Delicious and hearty quesadillas filled with grilled vegetables and melted cheese.', 4, 20, 15, ARRAY['1;pc;zucchini', '1;pc;red bell pepper', '1;pc;yellow onion', '1;cup;shredded cheddar cheese', '4;pcs;large flour tortillas', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Slice the zucchini, red bell pepper, and onion.', 'Toss the sliced veggies with olive oil, salt, and pepper, then grill until tender.', 'Place tortillas on a skillet, sprinkle cheese on half of each tortilla.', 'Add grilled veggies on top of the cheese, then fold the tortillas in half.', 'Cook until the tortillas are crispy and the cheese is melted.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Lemon Herb Grilled Salmon', 'Flaky grilled salmon fillets marinated in a zesty lemon and herb mixture.', 2, 15, 10, ARRAY['2;pcs;salmon fillets', '1;pc;lemon', '2;cloves;garlic', '1;bunch;Fresh thyme', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Mix the juice of half a lemon, minced garlic, chopped thyme, olive oil, salt, and pepper.', 'Coat the salmon with the marinade and let it sit for 10 minutes.', 'Grill the salmon fillets for about 4-5 minutes per side or until cooked through.', 'Serve with lemon slices and fresh thyme.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Mushroom Risotto', 'Creamy and rich risotto made with Arborio rice and sautéed mushrooms.', 4, 25, 10, ARRAY['1;cup;Arborio rice', '8;oz;mushrooms', '1;pc;shallot', '0.5;cup;dry white wine', '4;cups;vegetable broth', '.25;cup;grated Parmesan cheese', '1;cup;Butter', '1;bunch;Fresh parsley'], ARRAY['Sauté sliced mushrooms and chopped shallot in butter until golden brown.', 'Add Arborio rice and cook until translucent.', 'Pour in the white wine and cook until absorbed.', 'Gradually add warm vegetable broth, stirring until the rice is creamy and cooked.', 'Stir in Parmesan cheese, salt, and pepper.', 'Garnish with chopped fresh parsley.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Homestyle Beef Stew', 'A hearty and comforting stew with tender beef, root vegetables, and savory broth.', 6, 180, 20, ARRAY['1.5;lbs;stew beef', '3;pcs;carrots', '3;pcs;potatoes', '1;pc;onion', '3;cloves;garlic', '4;cups;beef broth', '1;cup;red wine', '1;cup;Flour', '1;pc;Rosemary', '1;pc;Thyme', '1;tbsp;Salt and pepper'], ARRAY['Dredge beef in flour, then brown in a pot with oil.', 'Add chopped onion, minced garlic, and red wine. Simmer for a few minutes.', 'Add beef broth, rosemary, thyme, salt, and pepper. Simmer covered for 2 hours.', 'Add chopped carrots and potatoes. Continue to simmer for another hour.', 'Adjust seasoning as needed.', 'Serve hot in bowls.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Caprese Salad', 'A simple and refreshing Italian salad with tomatoes, mozzarella, basil, and balsamic glaze.', 2, 10, 5, ARRAY['2;pcs;ripe tomatoes', '8;oz;fresh mozzarella', '1;bunch;Fresh basil leaves', '1;tbsp;Balsamic glaze', '1;tbsp;Extra virgin olive oil', '1;tbsp;Salt and pepper'], ARRAY['Slice tomatoes and fresh mozzarella into equal-sized rounds.', 'Arrange tomato and mozzarella slices on a plate, alternating them.', 'Tuck fresh basil leaves between the slices.', 'Drizzle with extra virgin olive oil and balsamic glaze.', 'Season with salt and pepper.', 'Serve as an appetizer or side dish.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Chocolate Lava Cake', 'Indulgent chocolate cake with a gooey molten center, perfect for satisfying your sweet tooth.', 4, 18, 10, ARRAY['.5;cup;butter', '.25;cup;semisweet chocolate chips', '1;cup;powdered sugar', '2;pcs;whole eggs', '2;pcs;egg yolks', '.5;tsp;vanilla extract', '.25;cup;all-purpose flour', '1;Pinch;salt'], ARRAY['Preheat the oven to 425°F (220°C).', 'Melt butter and chocolate chips together, then stir in powdered sugar.', 'Beat in whole eggs and egg yolks until smooth.', 'Stir in vanilla extract, flour, and salt.', 'Divide the batter into greased ramekins.', 'Bake for 12-14 minutes until the edges are set but the center is still soft.', 'Invert each cake onto a plate and serve immediately.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Homemade Margherita Pizza', 'A classic thin-crust pizza topped with tomatoes, fresh mozzarella, basil, and olive oil.', 2, 15, 10, ARRAY['1;pc;pizza dough ball', '.5;cup;tomato sauce', '8;oz;fresh mozzarella', '1;bunch;Fresh basil leaves', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Preheat the oven and pizza stone to the highest temperature.', 'Roll out the pizza dough into a thin round on a floured surface.', 'Spread tomato sauce over the dough, leaving a border for the crust.', 'Top with sliced mozzarella and torn basil leaves.', 'Drizzle with olive oil and season with salt and pepper.', 'Transfer the pizza onto the hot pizza stone and bake until crispy and golden.', 'Slice and serve hot.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Greek Salad', 'A refreshing and colorful salad featuring crisp vegetables, Kalamata olives, feta cheese, and a tangy dressing.', 4, 15, 10, ARRAY['1;pc;cucumber', '2;pcs;tomatoes', '1;pc;red onion', '1;pc;green bell pepper', '1;cup;Kalamata olives', '1;bunch;Feta cheese', '1;bunch;Fresh oregano', '1;tbsp;Extra virgin olive oil', 'Red wine vinegar', 'Salt and pepper'], ARRAY['Chop cucumber, tomatoes, red onion, and green bell pepper.', 'Combine the chopped vegetables in a bowl.', 'Add Kalamata olives and crumbled feta cheese.', 'Whisk together olive oil, red wine vinegar, chopped fresh oregano, salt, and pepper for the dressing.', 'Drizzle the dressing over the salad.', 'Toss gently to combine.', 'Serve as a light and flavorful side dish.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('iBy34ne2HvOwXX5uClbqlskHAvC2', 'recipe/rice_xnmqdq','Blueberry Pancakes', 'Fluffy pancakes bursting with sweet blueberries, perfect for a delicious breakfast treat.', 4, 20, 10, ARRAY['1;cup;all-purpose flour', '1;tbsp;sugar', '1;tsp;baking powder', '.5;tsp;baking soda', '.25;tsp;salt', '1;cup;buttermilk', '1;pc;egg', '2;tbsp;melted butter', '.5;cup;fresh blueberries'], ARRAY['In a bowl, whisk together flour, sugar, baking powder, baking soda, and salt.', 'In another bowl, whisk together buttermilk, egg, and melted butter.', 'Combine wet and dry ingredients until just combined.', 'Fold in fresh blueberries.', 'Heat a skillet over medium heat and lightly grease it.', 'Pour .25 cup of batter onto the skillet for each pancake.', 'Cook until bubbles form on the surface, then flip and cook until golden brown.', 'Serve warm with maple syrup.']);


INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Creamy Tomato Basil Soup', 'A comforting and flavorful soup made with ripe tomatoes, fresh basil, and a touch of cream.', 6, 30, 15, ARRAY['8;ripe;tomatoes', '1;pc;onion', '2;cloves;garlic', '.5;cup;fresh basil leaves', '.25;cup;heavy cream', '1;cup;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Preheat the oven to 400°F (200°C).', 'Roast the tomatoes, onion, and garlic with olive oil, salt, and pepper for 20 minutes.', 'Blend the roasted ingredients with basil until smooth.', 'Transfer the mixture to a pot, add cream, and heat until warmed through.', 'Serve with a garnish of fresh basil.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Grilled Veggie Quesadillas', 'Delicious and hearty quesadillas filled with grilled vegetables and melted cheese.', 4, 20, 15, ARRAY['1;pc;zucchini', '1;pc;red bell pepper', '1;pc;yellow onion', '1;cup;shredded cheddar cheese', '4;pcs;large flour tortillas', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Slice the zucchini, red bell pepper, and onion.', 'Toss the sliced veggies with olive oil, salt, and pepper, then grill until tender.', 'Place tortillas on a skillet, sprinkle cheese on half of each tortilla.', 'Add grilled veggies on top of the cheese, then fold the tortillas in half.', 'Cook until the tortillas are crispy and the cheese is melted.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Lemon Herb Grilled Salmon', 'Flaky grilled salmon fillets marinated in a zesty lemon and herb mixture.', 2, 15, 10, ARRAY['2;pcs;salmon fillets', '1;pc;lemon', '2;cloves;garlic', '1;bunch;Fresh thyme', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Mix the juice of half a lemon, minced garlic, chopped thyme, olive oil, salt, and pepper.', 'Coat the salmon with the marinade and let it sit for 10 minutes.', 'Grill the salmon fillets for about 4-5 minutes per side or until cooked through.', 'Serve with lemon slices and fresh thyme.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Mushroom Risotto', 'Creamy and rich risotto made with Arborio rice and sautéed mushrooms.', 4, 25, 10, ARRAY['1;cup;Arborio rice', '8;oz;mushrooms', '1;pc;shallot', '0.5;cup;dry white wine', '4;cups;vegetable broth', '.25;cup;grated Parmesan cheese', '1;cup;Butter', '1;bunch;Fresh parsley'], ARRAY['Sauté sliced mushrooms and chopped shallot in butter until golden brown.', 'Add Arborio rice and cook until translucent.', 'Pour in the white wine and cook until absorbed.', 'Gradually add warm vegetable broth, stirring until the rice is creamy and cooked.', 'Stir in Parmesan cheese, salt, and pepper.', 'Garnish with chopped fresh parsley.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Homestyle Beef Stew', 'A hearty and comforting stew with tender beef, root vegetables, and savory broth.', 6, 180, 20, ARRAY['1.5;lbs;stew beef', '3;pcs;carrots', '3;pcs;potatoes', '1;pc;onion', '3;cloves;garlic', '4;cups;beef broth', '1;cup;red wine', '1;cup;Flour', '1;pc;Rosemary', '1;pc;Thyme', '1;tbsp;Salt and pepper'], ARRAY['Dredge beef in flour, then brown in a pot with oil.', 'Add chopped onion, minced garlic, and red wine. Simmer for a few minutes.', 'Add beef broth, rosemary, thyme, salt, and pepper. Simmer covered for 2 hours.', 'Add chopped carrots and potatoes. Continue to simmer for another hour.', 'Adjust seasoning as needed.', 'Serve hot in bowls.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Caprese Salad', 'A simple and refreshing Italian salad with tomatoes, mozzarella, basil, and balsamic glaze.', 2, 10, 5, ARRAY['2;pcs;ripe tomatoes', '8;oz;fresh mozzarella', '1;bunch;Fresh basil leaves', '1;tbsp;Balsamic glaze', '1;tbsp;Extra virgin olive oil', '1;tbsp;Salt and pepper'], ARRAY['Slice tomatoes and fresh mozzarella into equal-sized rounds.', 'Arrange tomato and mozzarella slices on a plate, alternating them.', 'Tuck fresh basil leaves between the slices.', 'Drizzle with extra virgin olive oil and balsamic glaze.', 'Season with salt and pepper.', 'Serve as an appetizer or side dish.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Chocolate Lava Cake', 'Indulgent chocolate cake with a gooey molten center, perfect for satisfying your sweet tooth.', 4, 18, 10, ARRAY['.5;cup;butter', '.25;cup;semisweet chocolate chips', '1;cup;powdered sugar', '2;pcs;whole eggs', '2;pcs;egg yolks', '.5;tsp;vanilla extract', '.25;cup;all-purpose flour', '1;pinch;salt'], ARRAY['Preheat the oven to 425°F (220°C).', 'Melt butter and chocolate chips together, then stir in powdered sugar.', 'Beat in whole eggs and egg yolks until smooth.', 'Stir in vanilla extract, flour, and salt.', 'Divide the batter into greased ramekins.', 'Bake for 12-14 minutes until the edges are set but the center is still soft.', 'Invert each cake onto a plate and serve immediately.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Homemade Margherita Pizza', 'A classic thin-crust pizza topped with tomatoes, fresh mozzarella, basil, and olive oil.', 2, 15, 10, ARRAY['1;pc;pizza dough ball', '.5;cup;tomato sauce', '8;oz;fresh mozzarella', '1;bunch;Fresh basil leaves', '1;tbsp;Olive oil', '1;tbsp;Salt and pepper'], ARRAY['Preheat the oven and pizza stone to the highest temperature.', 'Roll out the pizza dough into a thin round on a floured surface.', 'Spread tomato sauce over the dough, leaving a border for the crust.', 'Top with sliced mozzarella and torn basil leaves.', 'Drizzle with olive oil and season with salt and pepper.', 'Transfer the pizza onto the hot pizza stone and bake until crispy and golden.', 'Slice and serve hot.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Greek Salad', 'A refreshing and colorful salad featuring crisp vegetables, Kalamata olives, feta cheese, and a tangy dressing.', 4, 15, 10, ARRAY['1;pc;cucumber', '2;pcs;tomatoes', '1;pc;red onion', '1;pc;green bell pepper', '1;cup;Kalamata olives', '1;bunch;Feta cheese', '1;bunch;Fresh oregano', '1;tbsp;Extra virgin olive oil', 'Red wine vinegar', 'Salt and pepper'], ARRAY['Chop cucumber, tomatoes, red onion, and green bell pepper.', 'Combine the chopped vegetables in a bowl.', 'Add Kalamata olives and crumbled feta cheese.', 'Whisk together olive oil, red wine vinegar, chopped fresh oregano, salt, and pepper for the dressing.', 'Drizzle the dressing over the salad.', 'Toss gently to combine.', 'Serve as a light and flavorful side dish.']);
INSERT INTO recipe_ (author_id, image_src, name, description, serves, cook_time, prep_time, ingredients, steps) VALUES ('mCXzOblK4hOK9agu2daZeS4ssXf2', 'recipe/rice_xnmqdq','Blueberry Pancakes', 'Fluffy pancakes bursting with sweet blueberries, perfect for a delicious breakfast treat.', 4, 20, 10, ARRAY['1;cup;all-purpose flour', '1;tbsp;sugar', '1;tsp;baking powder', '.5;tsp;baking soda', '.25;tsp;salt', '1;cup;buttermilk', '1;pc;egg', '2;tbsp;melted butter', '.5;cup;fresh blueberries'], ARRAY['In a bowl, whisk together flour, sugar, baking powder, baking soda, and salt.', 'In another bowl, whisk together buttermilk, egg, and melted butter.', 'Combine wet and dry ingredients until just combined.', 'Fold in fresh blueberries.', 'Heat a skillet over medium heat and lightly grease it.', 'Pour .25 cup of batter onto the skillet for each pancake.', 'Cook until bubbles form on the surface, then flip and cook until golden brown.', 'Serve warm with maple syrup.']);



INSERT INTO recipe_ (name, description, image_src, serves, cook_time, prep_time, ingredients, steps, author_id) VALUES (
  'Gua Bao',
  'Authentic gua bao recipe',
  'recipe/bao_i3lzki',
  2,
  5,
  5,
  ARRAY[
    '1;kg;pork belly',
    '1;l;pork stock',
    '500;g;udon'
  ],
  ARRAY[
    'Boil pork belly',
    'Cook noodles in broth',
    'serve'
  ],
  'mCXzOblK4hOK9agu2daZeS4ssXf2'
);

COMMIT;

-- docker compose down; docker compose up --build -d; docker ps
