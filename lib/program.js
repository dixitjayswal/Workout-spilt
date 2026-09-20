/* ─────────────────────────────────────────────────────────────
   Six-Day PPL — exercise library.
   n = name, t = muscles worked, s = execution steps,
   c = the cue that matters most, m = the mistake that wastes the set.
   ───────────────────────────────────────────────────────────── */

export const LIB = {

/* ───────── PUSH ───────── */
"bench-press": {
  n: "Barbell bench press", t: "Chest · front delts · triceps",
  s: ["Lie back with your eyes under the bar. Plant both feet, squeeze the shoulder blades down and together, keep a small arch in the lower back.",
      "Grip just outside shoulder width. Unrack and bring the bar over your lower chest with straight arms.",
      "Lower for 2 seconds to touch the chest at nipple line, elbows tucked to roughly 45° from your torso.",
      "Drive the bar back up and slightly toward your face. The shoulder blades stay pinned the whole time."],
  c: "Try to bend the bar apart like you're snapping it in half — it locks the lats in and protects the shoulders.",
  m: "Flaring the elbows to 90° and bouncing the bar off the ribs. Touch, pause for a beat, then press." },

"incline-db-press": {
  n: "Incline dumbbell press", t: "Upper chest · front delts · triceps",
  s: ["Set the bench to 30°. Any steeper and the front delts take the set over.",
      "Sit with the dumbbells on your thighs and kick them up one at a time as you lie back.",
      "Start with arms extended over the upper chest, palms facing forward.",
      "Lower for 2 seconds to chest level with elbows at about 45°, then press up and slightly together."],
  c: "Stop just before the dumbbells touch at the top — keeping them apart keeps the tension on the chest.",
  m: "Setting the bench to 45°. The upper chest stops working and the shoulders do the lifting." },

"seated-shoulder-press": {
  n: "Seated shoulder press", t: "Front & side delts · triceps",
  s: ["Set the backrest just off vertical. Sit with your whole back on the pad and feet planted.",
      "Bring the dumbbells to shoulder height, palms forward, elbows slightly in front of your body rather than straight out to the sides.",
      "Press up until the arms are long, letting the dumbbells travel slightly toward each other.",
      "Lower for 2 seconds until the elbows drop just below shoulder height."],
  c: "Ribs down, glutes on the seat. If your lower back peels off the pad, the weight is too heavy.",
  m: "Half reps at the top. Come all the way down to shoulder level every rep." },

"db-shoulder-press": {
  n: "Dumbbell shoulder press", t: "Front & side delts · triceps",
  s: ["Third pressing movement of the day — start lighter than you think and chase the rep range.",
      "Sit tall, elbows slightly forward of the torso, dumbbells at shoulder height.",
      "Press up smoothly and stop just short of locking the elbows out.",
      "Lower for 2 seconds to shoulder height and go straight into the next rep."],
  c: "The delts are already pre-fatigued by now — 10–12 clean reps beat 6 ugly ones.",
  m: "Leaning back and quietly turning it into an incline press." },

"overhead-press": {
  n: "Standing overhead press", t: "Front & side delts · triceps · core",
  s: ["Set the bar on the rack at upper-chest height. Grip just outside shoulder width, elbows under the bar.",
      "Unrack, step back, stand with feet hip width, glutes and abs braced hard.",
      "Press straight up, pulling your head back slightly so the bar clears your chin, then push your head through once it passes.",
      "Lock out with the bar over your mid-foot, then lower for 2 seconds back to the collarbones."],
  c: "Squeeze your glutes before every rep — it stops the lower back arching into the lift.",
  m: "Leaning back to muscle the bar up. If your ribs flare open, drop the weight." },

"incline-barbell-press": {
  n: "Incline barbell press", t: "Upper chest · front delts · triceps",
  s: ["Set the bench to 30° under the bar, eyes roughly below it.",
      "Shoulder blades back and down, feet planted, grip slightly wider than your shoulders.",
      "Unrack and lower for 2 seconds to just below the collarbone, elbows at about 45°.",
      "Press back up and slightly back, so the bar finishes over the shoulders rather than the face."],
  c: "Touch high on the chest. A low touch just turns it into a flat press on a tilted bench.",
  m: "Bouncing off the chest to disguise the fact that the weight is too heavy." },

"cable-fly": {
  n: "Cable fly", t: "Chest — stretch & squeeze",
  s: ["Set both pulleys at roughly shoulder height, take a handle in each hand and step forward into a split stance.",
      "Start with arms wide, elbows slightly bent and locked at that angle for the whole set.",
      "Bring your hands together in front of the sternum in a hugging arc — think about pressing your elbows together, not your hands.",
      "Open back out for 2 seconds until you feel a strong stretch across the chest, then reverse."],
  c: "Hold the squeeze for one full second at the front. This is the finisher — tension, not load.",
  m: "Bending and straightening the elbows, which quietly turns the fly into a press." },

"pec-deck": {
  n: "Pec deck", t: "Chest — stretch & squeeze",
  s: ["Set the seat so the handles sit at chest height with your upper arms parallel to the floor.",
      "Back flat on the pad, feet planted, forearms or hands against the pads.",
      "Bring the pads together in front of your chest and hold for a second.",
      "Let them open for 2 seconds until you feel the stretch, stopping before the stack touches down."],
  c: "The easiest place in the workout to genuinely go to failure — the machine catches you.",
  m: "Letting the stack slam down between reps and losing all the tension." },

"lateral-raise": {
  n: "Lateral raise", t: "Side delts",
  s: ["Stand with dumbbells at your sides, a slight forward lean at the hips, elbows softly bent.",
      "Lead with your elbows and raise out to the sides until your hands reach shoulder height.",
      "Keep the pinky slightly higher than the thumb, as if pouring from a jug.",
      "Lower for 2 seconds all the way down, resisting the whole way."],
  c: "Go lighter than your ego wants. Side delts respond to clean reps at 12–20, not to swinging.",
  m: "Shrugging. If your traps are doing the work, drop the weight and keep the shoulders down." },

"rear-delt-fly": {
  n: "Rear-delt fly", t: "Rear delts · upper back",
  s: ["On the reverse pec deck, set the seat so the handles sit at shoulder height, chest against the pad.",
      "Take the handles with a neutral grip, arms almost straight with a fixed soft elbow.",
      "Pull your arms back and apart in a wide arc, leading with the elbows.",
      "Squeeze for a beat, then return for 2 seconds under control."],
  c: "Think about pulling the handles apart, not pulling them back — it keeps the rear delts in and the lats out.",
  m: "Going heavy and jerking. This is a 15–20 rep movement, always." },

"close-grip-bench": {
  n: "Close-grip bench press", t: "Triceps · inner chest · front delts",
  s: ["Lie on a flat bench and grip the bar at roughly shoulder width — not narrower, or the wrists complain.",
      "Unrack and hold the bar over the lower chest with straight arms.",
      "Lower for 2 seconds with the elbows tucked close to your sides, touching the lower chest or upper stomach.",
      "Press back up, driving to lockout and squeezing the triceps hard at the top."],
  c: "Elbows glued to the ribs on the way down is the whole exercise.",
  m: "Gripping too narrow. That stresses the wrists without adding any triceps work." },

"dips": {
  n: "Triceps dips", t: "Triceps · lower chest · front delts",
  s: ["Mount the parallel bars with the arms locked and the shoulders pushed down away from your ears.",
      "Stay as upright as you can — leaning forward shifts the work onto the chest.",
      "Lower for 2 seconds until the upper arms are roughly parallel with the floor.",
      "Press back up and lock out, squeezing the triceps."],
  c: "Add weight with a belt once you can manage 12 clean bodyweight reps.",
  m: "Dropping too deep and letting the shoulders roll forward at the bottom." },

"overhead-triceps-ext": {
  n: "Overhead triceps extension", t: "Triceps — long head",
  s: ["Set a rope on a low pulley, face away from the stack and bring the rope overhead, hands behind your neck.",
      "Step into a split stance with a slight forward lean, upper arms beside your ears and locked there.",
      "Extend at the elbows only until the arms are straight, spreading the rope apart at the top.",
      "Let the elbows bend for 2 seconds until you feel a deep stretch behind the arm."],
  c: "Overhead is the only position that fully stretches the long head — that stretch is the entire point.",
  m: "Letting the elbows drift wide and forward, which shortens the range and kills the stretch." },

"rope-pushdown": {
  n: "Triceps rope pushdown", t: "Triceps — lateral head",
  s: ["Set the rope high on the cable. Stand close to the stack with a slight forward lean, elbows pinned to your ribs.",
      "Start with the forearms at about parallel to the floor.",
      "Push down and spread the rope apart at the bottom, turning the pinkies out.",
      "Let the forearms come back up for 2 seconds, stopping before the elbows drift forward."],
  c: "Upper arms stay frozen. Only the forearms move.",
  m: "Using the shoulders and bodyweight to shove the stack down. If you're bobbing, go lighter." },

"triceps-pushdown": {
  n: "Triceps pushdown", t: "Triceps",
  s: ["Attach a straight or V-bar high on the cable and take an overhand grip at shoulder width.",
      "Stand tall, elbows tight to your sides, forearms parallel to the floor.",
      "Push down to full lockout and squeeze for a beat.",
      "Return for 2 seconds until the forearms are back to parallel."],
  c: "Last set of the day — take this one to failure and chase the pump.",
  m: "Letting the bar travel above chest height, which hands the work to the shoulders." },

/* ───────── PULL ───────── */
"pullup": {
  n: "Pull-ups", t: "Lats · upper back · biceps",
  s: ["Grip the bar slightly wider than shoulder width, overhand. Hang with arms long and shoulders pulled down out of your ears.",
      "Brace your abs and cross your ankles so the body stays rigid — no swinging.",
      "Pull your elbows down and back toward your ribs until your chin clears the bar.",
      "Lower for 2 seconds to a full hang before the next rep."],
  c: "Start the rep by pulling the shoulder blades down, then bend the arms. Chest to the bar, not chin over it.",
  m: "Kipping and half reps. Use a band or the assisted machine to keep all 4 sets inside 6–10." },

"lat-pulldown": {
  n: "Wide-grip lat pulldown", t: "Lats · upper back · biceps",
  s: ["Set the thigh pad snug. Grip the bar wider than shoulder width, overhand.",
      "Sit tall with a slight backward lean of about 15° and the chest up.",
      "Pull the bar to your upper chest by driving the elbows down and back.",
      "Let the bar rise for 2 seconds until the arms are long and you feel the lats stretch."],
  c: "The swap for pull-ups when you can't hit the rep range — or for back-off sets straight after them.",
  m: "Leaning way back and rowing. Keep the torso nearly still and let the arms do the travelling." },

"barbell-row": {
  n: "Bent-over barbell row", t: "Mid back · lats · rear delts · biceps",
  s: ["Take an overhand grip just outside shoulder width. Feet hip width, bar over the mid-foot.",
      "Hinge at the hips until your torso is about 45° to the floor, back flat, knees softly bent.",
      "Row the bar to your lower ribs or navel, driving the elbows back past your torso.",
      "Lower for 2 seconds until the arms are long, holding that torso angle the entire set."],
  c: "The torso angle must not change. If you stand up to move the bar, the set is over.",
  m: "Rounding the lower back. Lighter weight, flat back, and a real squeeze at the top." },

"t-bar-row": {
  n: "T-bar row", t: "Mid back · lats · rear delts",
  s: ["Straddle the bar, hinge to about 45° and take the handle with a neutral grip.",
      "Set the back flat, chest up, knees softly bent.",
      "Pull the handle to your stomach with the elbows tracking close to the body.",
      "Lower for 2 seconds to a full stretch without letting the plates rest down."],
  c: "The neutral grip and shorter lever make this the back-friendly swap for barbell rows.",
  m: "Yanking with the lower back at the start of each rep." },

"chest-supported-row": {
  n: "Chest-supported row", t: "Mid back · lats · rear delts",
  s: ["Lie face down on the incline pad with your chest firmly supported and feet planted.",
      "Let the arms hang straight down and grip the handles.",
      "Row by pulling the elbows back and up toward the ceiling, squeezing the shoulder blades together.",
      "Lower for 2 seconds to a full stretch, letting the shoulder blades spread apart at the bottom."],
  c: "The pad takes the lower back out of the equation, so you can genuinely push near failure here.",
  m: "Peeling the chest off the pad for the last rep — that's the lower back cheating its way back in." },

"seated-cable-row": {
  n: "Seated cable row", t: "Mid back · lats · biceps",
  s: ["Sit with feet on the platform, knees softly bent, and take the handle with the arms long.",
      "Sit tall with a natural arch in the lower back, chest up.",
      "Pull the handle to your navel, driving the elbows straight back alongside your ribs.",
      "Let the arms extend for 2 seconds, allowing the shoulder blades to spread at the front."],
  c: "Let the blades travel forward at the stretch and pinch together at the squeeze — that full range is where back thickness comes from.",
  m: "Rocking back and forth from the hips to swing the stack along." },

"close-grip-pulldown": {
  n: "Close-grip lat pulldown", t: "Lower lats · biceps",
  s: ["Attach a V-bar or neutral handle and lock the thigh pad down.",
      "Grip with the palms facing each other, sit tall, chest up, slight lean back.",
      "Pull the handle to your upper chest, elbows driving down along your sides.",
      "Return for 2 seconds to a full stretch overhead."],
  c: "The neutral close grip hits the lower lats and adds the thickness the wide grip misses.",
  m: "Pulling behind the neck. Always to the chest — it's stronger and safer." },

"one-arm-db-row": {
  n: "Single-arm dumbbell row", t: "Lats · mid back · rear delts",
  s: ["Put one knee and the same-side hand on a flat bench, the other foot planted on the floor.",
      "Let the dumbbell hang straight down, back flat and roughly parallel to the floor.",
      "Row the dumbbell to your hip, driving the elbow back past your ribs.",
      "Lower for 2 seconds to a full stretch, letting the shoulder blade reach forward at the bottom."],
  c: "Row toward the hip, not the armpit — it puts the lat in its strongest line of pull.",
  m: "Twisting the torso open to heave the weight up. Shoulders stay level." },

"deadlift": {
  n: "Deadlift", t: "Whole posterior chain · traps · grip",
  s: ["Set up with the bar over your mid-foot, feet hip width. Hinge and grip just outside your shins.",
      "Drop the hips until the shins touch the bar — chest up, lats tight, back flat. Take the slack out of the bar before you pull.",
      "Drive the floor away with your legs, keeping the bar dragging up your shins and thighs.",
      "Lock out by standing tall and squeezing the glutes — don't lean back. Lower under control along the same path."],
  c: "Only 3 heavy sets, on purpose. This lift taxes recovery more than anything else in the week.",
  m: "Letting the hips shoot up first so it becomes a stiff-legged pull with a rounded back. Rack pulls are the safer swap." },

"shrug": {
  n: "Barbell shrug", t: "Upper traps",
  s: ["Hold the bar at arm's length in front of your thighs, overhand grip at shoulder width — straps if your grip is the limit.",
      "Stand tall, chest up, arms completely straight, and they stay straight.",
      "Shrug your shoulders straight up toward your ears and hold at the top for a full second.",
      "Lower for 2 seconds to a full stretch."],
  c: "Pause at the top. Traps respond to the held squeeze, not to the bounce.",
  m: "Rolling the shoulders. Straight up, straight down — rolling only grinds the joint." },

"straight-arm-pulldown": {
  n: "Straight-arm pulldown", t: "Lats — isolated",
  s: ["Set a straight bar or rope high on the cable. Stand back from the stack with a slight hinge at the hips.",
      "Grip at shoulder width with arms almost straight, elbows locked at a soft bend.",
      "Push the bar down in an arc to your thighs, squeezing the lats hard at the bottom.",
      "Let the arms rise for 2 seconds until they're overhead and the lats are fully stretched."],
  c: "The one lat movement with zero biceps involvement — feel it, don't load it.",
  m: "Bending the elbows, which turns it into a pushdown for the triceps." },

"face-pull": {
  n: "Face pull", t: "Rear delts · rotator cuff · upper traps",
  s: ["Set a rope at upper-chest to face height. Take an overhand grip with the thumbs pointing back at you.",
      "Step back until there's tension with the arms extended, feet staggered.",
      "Pull the rope toward your forehead, splitting your hands apart and rotating so the knuckles finish facing the ceiling.",
      "Return for 2 seconds under control."],
  c: "Finish every rep in a double-biceps pose. This is shoulder insurance for all the pressing — never skip it.",
  m: "Going too heavy and turning it into a high row. Light weight, 15–20 reps, hold every squeeze." },

"barbell-curl": {
  n: "Barbell curl", t: "Biceps — both heads",
  s: ["Stand with feet hip width, holding the bar at shoulder width with an underhand grip, arms long.",
      "Pin your elbows to your sides and keep them there for every rep.",
      "Curl the bar up to shoulder height by bending the elbows only.",
      "Lower for 2 seconds all the way back to straight arms."],
  c: "Full extension at the bottom of every rep — the stretched position builds most of the arm.",
  m: "Swinging with the lower back and letting the elbows travel forward." },

"hammer-curl": {
  n: "Hammer curl", t: "Brachialis · brachioradialis · biceps",
  s: ["Stand with a dumbbell in each hand, palms facing your thighs, arms long.",
      "Keep that neutral grip fixed for the whole rep — no rotation.",
      "Curl up toward the shoulder with the elbows stationary at your sides.",
      "Lower for 2 seconds to full extension. Alternate arms or go both together."],
  c: "This is the movement that adds arm thickness and width, not just the biceps peak.",
  m: "Letting the shoulders swing forward to start each rep." },

"preacher-curl": {
  n: "Preacher curl", t: "Biceps — short head",
  s: ["Set the seat so the top of the pad sits under your armpits, upper arms flat on the pad.",
      "Take an underhand grip on the EZ bar at shoulder width.",
      "Curl up until the forearms are just short of vertical — stop before the tension disappears.",
      "Lower for 2 seconds to nearly straight arms, staying in control at the bottom."],
  c: "The pad kills all momentum, which is exactly why it works.",
  m: "Dropping the weight fast at the bottom. Straightening hard and fast under a heavy bar is how biceps tear." },

"incline-db-curl": {
  n: "Incline dumbbell curl", t: "Biceps — long head",
  s: ["Set a bench to 45–60° and sit back with your arms hanging straight down behind your torso.",
      "Let the dumbbells hang with palms facing forward — you should feel the stretch immediately.",
      "Curl up without letting the elbows drift forward.",
      "Lower for 2 seconds back to the full hanging stretch."],
  c: "The behind-the-body arm position is what loads the long head. Keep the elbows back there.",
  m: "Letting the shoulders roll forward, which cancels the very stretch the position exists to create." },

"cable-curl": {
  n: "Cable curl", t: "Biceps — constant tension",
  s: ["Attach a straight bar to a low pulley and stand back a step so there's tension at the bottom.",
      "Elbows at your sides, arms long, chest up.",
      "Curl up to shoulder height and squeeze hard for a beat.",
      "Lower for 2 seconds to full extension, never letting the stack rest."],
  c: "Cables keep load on the muscle at every joint angle — the right way to finish arm day.",
  m: "Standing too close to the stack, which loses all tension at the bottom of every rep." },

/* ───────── LEGS ───────── */
"back-squat": {
  n: "Barbell back squat", t: "Quads · glutes · adductors · core",
  s: ["Set the bar just below shoulder height. Get under it, bar resting on the upper traps, hands just outside the shoulders.",
      "Unrack, step back two steps, feet shoulder width with toes turned out 15–30°.",
      "Take a big breath into the stomach, brace, and sit down and back for 2 seconds until the hip crease passes the knee.",
      "Drive up through the whole foot, pushing the floor away, knees tracking over the toes."],
  c: "Knees travel out over the toes, never in. Squeeze the floor apart with your feet.",
  m: "Cutting depth. Half squats at a heavy weight build less than full squats at a lighter one." },

"leg-press": {
  n: "Leg press", t: "Quads · glutes · hamstrings",
  s: ["Sit with your whole back and hips against the pad. Feet shoulder width in the middle of the platform.",
      "Release the safeties and straighten the legs without snapping the knees into lockout.",
      "Lower for 2 seconds until the knees reach about 90° or just past.",
      "Press back up through the heels and mid-foot, stopping just short of full lockout."],
  c: "Higher and wider feet shift the work to glutes and hamstrings; lower and closer hits the quads.",
  m: "Letting the lower back round off the pad at the bottom. Stop at the depth where your hips stay planted." },

"walking-lunge": {
  n: "Walking lunges", t: "Quads · glutes · hamstrings · balance",
  s: ["Hold dumbbells at your sides or a bar on your back. Stand tall with feet hip width.",
      "Step forward far enough that your front shin finishes close to vertical.",
      "Lower until the back knee is just above the floor, torso upright.",
      "Drive through the front heel to stand, then step straight into the next rep with the other leg."],
  c: "A longer step loads the glutes; a shorter step loads the quads. Count reps per leg.",
  m: "Short choppy steps that push the front knee way out past the toes." },

"bulgarian-split-squat": {
  n: "Bulgarian split squat", t: "Quads · glutes · adductors",
  s: ["Stand about two feet in front of a bench and place the top of your rear foot on it.",
      "Hold a dumbbell in each hand. Check your stance length — the front shin should stay near vertical at the bottom.",
      "Lower for 2 seconds until the front thigh is roughly parallel to the floor.",
      "Drive up through the front heel without pushing off the back foot."],
  c: "The hardest 10 reps in the program. A slight forward torso lean loads the glute harder.",
  m: "Standing too close to the bench, which crushes the front knee and takes the glute out of it." },

"leg-extension": {
  n: "Leg extension", t: "Quads — isolated",
  s: ["Set the backrest so your knee joint lines up with the machine's pivot point.",
      "Set the ankle pad just above the top of your feet and hold the side handles.",
      "Straighten the legs fully and squeeze the quads hard for a full second at the top.",
      "Lower for 2 seconds, stopping before the stack touches down."],
  c: "Point the toes slightly up and out to bias the inner quad above the knee.",
  m: "Bouncing out of the bottom. Pause at the top, control the way down — that's the whole exercise." },

"seated-leg-curl": {
  n: "Seated leg curl", t: "Hamstrings",
  s: ["Line your knees up with the machine's pivot, thigh pad locked snug across the lower thighs.",
      "Grip the handles and sit back against the pad.",
      "Curl the pad down and back as far as it goes, squeezing the hamstrings at the bottom.",
      "Return for 2 seconds until the legs are nearly straight."],
  c: "Seated works the hamstrings in a stretched hip position — it out-grows the lying version.",
  m: "Lifting the hips off the seat to steal extra range. Stay planted." },

"lying-leg-curl": {
  n: "Lying leg curl", t: "Hamstrings · calves",
  s: ["Lie face down with your knees just off the edge of the pad and the ankle pad on your lower calves.",
      "Grip the handles and keep the hips pressed into the bench.",
      "Curl your heels toward your glutes as far as they'll go and squeeze.",
      "Lower for 2 seconds until the legs are nearly straight."],
  c: "Pointing the toes toward your shins through the curl increases hamstring recruitment.",
  m: "Arching the lower back and lifting the hips to swing the weight up." },

"rdl": {
  n: "Romanian deadlift", t: "Hamstrings · glutes · lower back",
  s: ["Start standing with the bar at your thighs, overhand grip at shoulder width, knees softly bent.",
      "Push your hips straight back and let the bar slide down the front of your legs, keeping it in contact.",
      "Lower for 2 seconds until you feel a deep hamstring stretch, usually mid-shin, back flat.",
      "Drive the hips forward to stand tall and squeeze the glutes at the top."],
  c: "Hips back, not down. The knee angle barely changes from start to finish.",
  m: "Bending the knees until it's just a deadlift, or rounding the back to chase extra depth. Stop where your hamstrings stop you." },

"hip-thrust": {
  n: "Hip thrust", t: "Glutes · hamstrings",
  s: ["Sit on the floor with your upper back against a bench, bar over the hips with a pad on it.",
      "Plant your feet about shoulder width so the shins finish vertical at the top.",
      "Drive through the heels and push the hips up until the torso is parallel to the floor.",
      "Squeeze the glutes hard for a full second at the top, then lower for 2 seconds."],
  c: "Tuck the chin and keep the ribs down. If you feel it in the lower back, you're over-extending at the top.",
  m: "Hyperextending the spine at the top instead of finishing the rep with the glutes." },

"standing-calf-raise": {
  n: "Standing calf raise", t: "Calves — gastrocnemius",
  s: ["Place the balls of your feet on the platform with the heels hanging free, shoulders under the pads.",
      "Straighten the legs — the straight knee is what targets the gastrocnemius.",
      "Rise as high onto the toes as you can and hold the squeeze for a full second.",
      "Lower for 2 seconds into a deep stretch at the bottom."],
  c: "Full stretch to full contraction every single rep. Calves only grow from the ends of the range.",
  m: "Fast bouncy reps that use the Achilles tendon instead of the muscle." },

"seated-calf-raise": {
  n: "Seated calf raise", t: "Calves — soleus",
  s: ["Sit with the balls of your feet on the platform and the pad locked over your lower thighs.",
      "Release the safety catch and let the heels drop into a full stretch.",
      "Push up onto the toes as high as possible and hold for a second.",
      "Lower for 2 seconds back into the deep stretch."],
  c: "The bent knee targets the soleus — the muscle that gives the calf its width from the front.",
  m: "Short partial reps with a heavy stack. Go lighter, go fuller, chase 15–20." },

/* ───────── CORE ───────── */
"hanging-leg-raise": {
  n: "Hanging leg raise", t: "Lower abs · hip flexors",
  s: ["Hang from a bar with the shoulders pulled down out of your ears, legs together.",
      "Brace your abs so the body stops swinging before the first rep.",
      "Raise your legs by curling the pelvis up toward your ribs, not just lifting the thighs.",
      "Lower for 2 seconds under full control. Bend the knees if straight legs make you swing."],
  c: "The rep is the pelvis tilting up. If your hips never move, you're only training hip flexors.",
  m: "Swinging into the top. If you can't kill the swing, use the captain's chair instead." },

"cable-crunch": {
  n: "Cable crunch", t: "Abs — loaded",
  s: ["Kneel facing a high cable with a rope held at either side of your head.",
      "Set your hips back and keep them fixed — the hips must not move all set.",
      "Crunch down by rounding the spine and bringing your elbows toward your thighs.",
      "Squeeze hard at the bottom, then return for 2 seconds."],
  c: "Add weight over time. Abs are a muscle and need progressive overload like everything else.",
  m: "Hinging at the hips instead of flexing the spine — that makes it a lat pulldown with a rope." },

"ab-roller": {
  n: "Ab wheel rollout", t: "Whole core · lats",
  s: ["Kneel with the wheel under your shoulders, arms straight, abs braced and ribs pulled down.",
      "Roll forward slowly, keeping the hips and ribs locked in one line — no sagging.",
      "Go only as far as you can while keeping the lower back from arching.",
      "Pull back with your abs, not your arms, to the start."],
  c: "Range comes from your control, not your flexibility. Add an inch each week.",
  m: "Letting the lower back sag at full reach — that's the brace failing and the spine taking the load." },

"plank": {
  n: "Plank", t: "Whole core · shoulders",
  s: ["Set the forearms under the shoulders, elbows shoulder width, feet hip width.",
      "Squeeze your glutes and tuck the pelvis slightly so the lower back flattens.",
      "Hold a straight line from ears to heels, breathing normally.",
      "Hold 45–60 seconds with real tension, not a comfortable sag."],
  c: "A hard 30 seconds beats a slack 2 minutes. Squeeze everything.",
  m: "Hips drifting up into a tent, or sagging down into the lower back." },

"russian-twist": {
  n: "Russian twist", t: "Obliques · deep core",
  s: ["Sit with knees bent and heels on or just off the floor, torso leaned back to about 45°.",
      "Hold a plate or dumbbell at your chest with both hands.",
      "Rotate from the ribcage to bring the weight beside your hip, eyes following the weight.",
      "Rotate to the other side under control. That's one rep per side."],
  c: "Rotation comes from the ribcage turning, not the arms swinging across a still torso.",
  m: "Fast arm-only sweeps with a rounded back." },

"woodchop": {
  n: "Cable woodchop", t: "Obliques · deep core",
  s: ["Set a cable high, stand side-on and grip the handle with both hands, arms nearly straight.",
      "Stand in a wide athletic stance with a slight knee bend.",
      "Pull the handle down and across to the opposite hip, rotating through the torso and pivoting the back foot.",
      "Return for 2 seconds, resisting the rotation the whole way back."],
  c: "Arms stay long. The power comes from the torso turning against the cable.",
  m: "Bending the elbows and turning it into a lat pulldown." },

/* ───────── WARM-UP ───────── */
"arm-circles": { n: "Arm circles", t: "Shoulders", s: ["Stand with the arms out to the sides at shoulder height.", "Make small circles forward, gradually widening them — 15 reps.", "Reverse the direction for 15."], c: "Raises shoulder temperature before any pressing." },
"band-pull-apart": { n: "Band pull-aparts", t: "Rear delts · upper back", s: ["Hold a light band at shoulder width with arms straight out in front.", "Pull the band apart until your hands are wide and it touches your chest.", "Squeeze the shoulder blades, then return slowly — 15 reps."], c: "Wakes the upper back up so it can hold position under the working sets." },
"cat-cow": { n: "Cat-cow", t: "Spine mobility", s: ["On hands and knees, hands under the shoulders and knees under the hips.", "Exhale and round the spine toward the ceiling, tucking the chin.", "Inhale and arch, lifting the chest and tailbone — 10 slow cycles."], c: "Moves the spine through its full range before you load it." },
"bodyweight-squat": { n: "Bodyweight squats", t: "Hips · knees · ankles", s: ["Feet shoulder width, toes slightly out, arms out in front for balance.", "Sit down and back to full depth under control.", "Stand tall and repeat for 15 reps, going slightly deeper each time."], c: "Your ankle and hip range check before anything loaded goes on your back." },
"scapular-pullup": { n: "Scapular pulls", t: "Lats · scapular control", s: ["Hang from the bar with the arms completely straight.", "Without bending the elbows, pull the shoulder blades down and back so the body rises a few inches.", "Hold for a beat, release to a full hang — 12 reps."], c: "Teaches the lats to start the pull instead of the biceps." },
"glute-bridge": { n: "Glute bridges", t: "Glutes — activation", s: ["Lie on your back, knees bent, feet flat and hip width.", "Drive through the heels and lift the hips until the body is in one line.", "Squeeze the glutes for a second at the top, lower slowly — 15 reps."], c: "Switches the glutes on so they, not the lower back, run your hinges." },
"bodyweight-lunge": { n: "Walking lunges — bodyweight", t: "Hips · quads", s: ["Step forward into a lunge and lower the back knee toward the floor.", "Drive through the front heel and step straight into the next rep.", "10 per leg, unloaded."], c: "The last step before loading the legs — it opens the hips under motion." },

/* ───────── COOLDOWN ───────── */
"chest-stretch": { n: "Chest doorway stretch", t: "Chest · front delts", s: ["Place your forearm on a doorframe with the elbow at shoulder height.", "Step through with the same-side foot and rotate the chest away.", "Hold 30 seconds each side, breathing out into the stretch."], c: "The direct antidote to a day of pressing and a day at a desk." },
"lat-stretch": { n: "Overhead side stretch", t: "Lats · obliques", s: ["Reach both arms overhead and grip one wrist with the other hand.", "Lean away from the gripped side until the lat lengthens down your ribs.", "Hold 30 seconds each side."], c: "Do it hanging from a bar if you can — gravity does the work for you." },
"quad-stretch": { n: "Standing quad stretch", t: "Quads · hip flexors", s: ["Stand tall, grab one ankle and pull the heel toward your glute.", "Keep the knees together and tuck the pelvis so you feel it up the front of the thigh.", "Hold 30 seconds each side, using a wall for balance."], c: "Tuck the pelvis under — without it you stretch the knee, not the quad." },
"hamstring-stretch": { n: "Seated hamstring fold", t: "Hamstrings · calves", s: ["Sit with one leg straight out and the other tucked in.", "Hinge forward from the hips, reaching toward the straight foot with a flat back.", "Hold 30 seconds each side."], c: "Hinge at the hips, not the spine — a rounded back stretches the wrong tissue." },
"hip-flexor-stretch": { n: "Hip flexor lunge stretch", t: "Hip flexors · quads", s: ["Kneel in a half-lunge with the back knee on the floor.", "Squeeze the back glute and push the hips gently forward, ribs down.", "Hold 30 seconds each side."], c: "The single highest-value stretch for anyone who sits all day." },
"glute-stretch": { n: "Glute figure-4", t: "Glutes · piriformis", s: ["Lying on your back, cross one ankle over the opposite knee.", "Pull the supporting thigh toward your chest until the crossed glute lengthens.", "Hold 30 seconds each side."], c: "Works just as well sitting in a chair at your desk." },
"triceps-stretch": { n: "Overhead triceps stretch", t: "Triceps · lats", s: ["Reach one arm overhead and bend the elbow so the hand drops behind your neck.", "Use the other hand to press the elbow gently back and down.", "Hold 30 seconds each side."], c: "Follow it with a cross-body shoulder stretch to cover the rear delt too." },
"calf-stretch": { n: "Calf wall stretch", t: "Calves · Achilles", s: ["Hands on a wall with one leg back and straight, heel pressed down.", "Lean into the wall until you feel the stretch through the calf.", "Hold 30 seconds, then bend the back knee slightly for 30 more."], c: "Two positions — straight knee for the gastroc, bent knee for the soleus." },
"childs-pose": { n: "Child's pose", t: "Lower back · lats · hips", s: ["Kneel and sit your hips back onto your heels, knees wide.", "Walk your hands forward and let the chest sink toward the floor.", "Hold 45–60 seconds and breathe into the lower back."], c: "Finish every session here. It downshifts the nervous system before you leave." }

};

/* ─────────────────────────────────────────────────────────────
   The program. Each slot lists its variants — the first is the
   default, the second is the equally valid swap.
   ───────────────────────────────────────────────────────────── */

export const NO_PHOTO = { "light-cardio": { n: "Light cardio", t: "Raise core temperature", d: "3–5 min", s: ["Bike, rower or incline walk at a conversational pace.", "You want a light sweat and a raised heart rate, not fatigue."], c: "Never stretch a cold muscle. Warm it first, then move it." },
  "leg-swings": { n: "Leg swings", t: "Hips — front/back & side", d: "10 / leg", s: ["Hold a rack for balance and swing one leg forward and back, 10 times.", "Then swing it across your body side to side, 10 times.", "Repeat on the other leg."], c: "Start with small swings and let the range build — don't force the end range." },
  "hip-circles": { n: "Hip circles", t: "Hip joint", d: "10 / side", s: ["Stand on one leg holding a rack, lift the other knee to hip height.", "Draw slow circles with the knee, 10 out and 10 in.", "Switch legs."], c: "Opens the hip capsule before squatting or hinging." },
  "dislocates": { n: "Shoulder dislocates", t: "Shoulder range", d: "10 reps", s: ["Hold a band or broomstick wide, arms straight.", "Keeping the arms locked, sweep it overhead and behind you as far as comfortable.", "Return the same way. Widen your grip if it's tight."], c: "Go wide. A narrow grip forces the shoulder past its available range." },
  "scap-pushups": { n: "Scapular push-ups", t: "Serratus · scapular control", d: "10 reps", s: ["Start in a push-up position with the arms locked straight.", "Without bending the elbows, let the chest sink between the shoulder blades.", "Push the blades apart to lift the upper back toward the ceiling."], c: "Small movement, big payoff — it stabilises the shoulder blade under pressing." } };

export const PROGRAM = [
  { id: "push-a", n: 1, day: "Push A", focus: "Chest focus", block: "push",
    warm: ["light-cardio", "arm-circles", "band-pull-apart", "dislocates", "scap-pushups", "cat-cow"],
    cool: ["chest-stretch", "triceps-stretch", "lat-stretch", "childs-pose"],
    slots: [
      { v: ["bench-press"], sets: 4, reps: "6–8", note: "Heaviest lift of the day — take the full 3 min between sets." },
      { v: ["incline-db-press"], sets: 3, reps: "8–10" },
      { v: ["seated-shoulder-press"], sets: 3, reps: "8–10" },
      { v: ["cable-fly", "pec-deck"], sets: 3, reps: "12–15" },
      { v: ["lateral-raise"], sets: 3, reps: "12–15" },
      { v: ["overhead-triceps-ext"], sets: 3, reps: "10–12" },
      { v: ["rope-pushdown"], sets: 3, reps: "12–15" }
    ] },

  { id: "pull-a", n: 2, day: "Pull A", focus: "Back width", block: "pull",
    warm: ["light-cardio", "band-pull-apart", "scapular-pullup", "cat-cow", "arm-circles"],
    cool: ["lat-stretch", "chest-stretch", "childs-pose"],
    slots: [
      { v: ["pullup", "lat-pulldown"], sets: 4, reps: "6–10", note: "Band-assist or drop to pulldowns rather than grinding out half reps." },
      { v: ["barbell-row", "t-bar-row"], sets: 4, reps: "8–10" },
      { v: ["seated-cable-row"], sets: 3, reps: "10–12" },
      { v: ["straight-arm-pulldown"], sets: 3, reps: "12–15" },
      { v: ["face-pull"], sets: 3, reps: "15–20", note: "Shoulder insurance. Light, slow, every rep held." },
      { v: ["barbell-curl"], sets: 3, reps: "8–12" },
      { v: ["hammer-curl"], sets: 3, reps: "10–12" }
    ] },

  { id: "legs-a", n: 3, day: "Legs A", focus: "Quad focus", block: "legs",
    warm: ["light-cardio", "leg-swings", "hip-circles", "bodyweight-squat", "glute-bridge", "bodyweight-lunge"],
    cool: ["quad-stretch", "hamstring-stretch", "hip-flexor-stretch", "glute-stretch", "calf-stretch", "childs-pose"],
    slots: [
      { v: ["back-squat"], sets: 4, reps: "6–8", note: "Ramp up with 2–3 light sets before the first working set." },
      { v: ["leg-press"], sets: 3, reps: "10–12" },
      { v: ["walking-lunge"], sets: 3, reps: "10–12 / leg" },
      { v: ["leg-extension"], sets: 3, reps: "12–15" },
      { v: ["seated-leg-curl"], sets: 3, reps: "10–12" },
      { v: ["standing-calf-raise"], sets: 4, reps: "12–15" }
    ] },

  { id: "push-b", n: 4, day: "Push B", focus: "Shoulder focus", block: "push",
    warm: ["light-cardio", "arm-circles", "band-pull-apart", "dislocates", "scap-pushups", "cat-cow"],
    cool: ["chest-stretch", "triceps-stretch", "lat-stretch", "childs-pose"],
    slots: [
      { v: ["overhead-press"], sets: 4, reps: "6–8", note: "Standing and strict. No leg drive." },
      { v: ["incline-barbell-press"], sets: 3, reps: "8–10" },
      { v: ["db-shoulder-press"], sets: 3, reps: "10–12" },
      { v: ["lateral-raise"], sets: 4, reps: "12–20", note: "Drop set on the last set: hit failure, cut the weight ~40%, go again." },
      { v: ["rear-delt-fly"], sets: 3, reps: "15–20" },
      { v: ["close-grip-bench", "dips"], sets: 3, reps: "8–10" },
      { v: ["triceps-pushdown"], sets: 3, reps: "12–15" }
    ] },

  { id: "pull-b", n: 5, day: "Pull B", focus: "Back thickness", block: "pull",
    warm: ["light-cardio", "cat-cow", "band-pull-apart", "glute-bridge", "scapular-pullup"],
    cool: ["lat-stretch", "hamstring-stretch", "chest-stretch", "childs-pose"],
    slots: [
      { v: ["deadlift"], sets: 3, reps: "5–6", note: "Rack pulls are a fair swap if your lower back is still fried from Legs A." },
      { v: ["chest-supported-row"], sets: 4, reps: "8–10" },
      { v: ["close-grip-pulldown"], sets: 3, reps: "10–12" },
      { v: ["one-arm-db-row"], sets: 3, reps: "10–12" },
      { v: ["shrug"], sets: 3, reps: "12–15" },
      { v: ["preacher-curl", "incline-db-curl"], sets: 3, reps: "10–12" },
      { v: ["cable-curl"], sets: 3, reps: "12–15" }
    ] },

  { id: "legs-b", n: 6, day: "Legs B", focus: "Posterior focus", block: "legs", optional: true,
    warm: ["light-cardio", "leg-swings", "hip-circles", "glute-bridge", "bodyweight-squat", "cat-cow"],
    cool: ["hamstring-stretch", "glute-stretch", "quad-stretch", "hip-flexor-stretch", "calf-stretch", "childs-pose"],
    slots: [
      { v: ["rdl"], sets: 4, reps: "8–10", note: "Leave a rep or two in the tank — this one punishes ego." },
      { v: ["hip-thrust"], sets: 3, reps: "10–12" },
      { v: ["bulgarian-split-squat"], sets: 3, reps: "10 / leg" },
      { v: ["lying-leg-curl", "seated-leg-curl"], sets: 4, reps: "10–12" },
      { v: ["leg-press"], mg: "Glutes", sets: 3, reps: "12–15", note: "High foot placement — shifts the load onto hamstrings and glutes." },
      { v: ["seated-calf-raise"], sets: 4, reps: "15–20" }
    ] }
];

export const CORE = [
  { v: ["hanging-leg-raise"], sets: 3, reps: "10–15" },
  { v: ["cable-crunch"], sets: 3, reps: "12–15", note: "Add weight over time — abs need overload." },
  { v: ["ab-roller", "plank"], sets: 3, reps: "8–12  /  45–60 s" },
  { v: ["russian-twist", "woodchop"], sets: 3, reps: "15 / side" }
];
