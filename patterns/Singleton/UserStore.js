export class UserStore {
    static #instance;
    users = [];
    constructor() {
        if (UserStore.#instance) {
            throw new Error('To create the instance, please call getInstance method on this class, UserStore.getInstance');
        }

        Object.freeze(this);
        // Freezes the instance to prevent:
        // - Modifying existing properties
        // - Adding new properties
        // - Deleting properties
        // Note: This is shallow freeze. Nested objects (like this.users array) can still be mutated.
    }

    static getInstance() {
        if (!UserStore.#instance) {
            UserStore.#instance = new UserStore();
        }
        return UserStore.#instance;
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return [...this.users];
    }

}






/*
============================================================
OBJECT.FREEZE() — ARCHITECTURE NOTES (Using UserStore Example)
============================================================

We are considering 3 scenarios:

1) No Freeze
2) Object.freeze(this)        → Freeze INSTANCE
3) Object.freeze(UserStore)   → Freeze CLASS


------------------------------------------------------------
1️⃣ NO FREEZE (Default Behavior)
------------------------------------------------------------

PROS:
- Maximum flexibility.
- Easy to extend later (Observer pattern, plugins, new properties).
- Easy to test or mock methods.
- Best for growing applications.

CONS:
- External code can accidentally modify store.

Example Risks:

const store = UserStore.getInstance();

store.users = null;          // ❌ Breaks internal state
store.addUser = null;        // ❌ Breaks API
store.newProp = "hack";      // ❌ Adds unwanted property

Conclusion:
Good for application-level development where flexibility is needed.


------------------------------------------------------------
2️⃣ Object.freeze(this)  → Freeze INSTANCE
------------------------------------------------------------

If added inside constructor:

Object.freeze(this);

What It Prevents:
- Modifying existing properties.
- Adding new properties.
- Deleting properties.
- Reassigning methods.

Example:

store.users = [];        // ❌ Blocked
store.addUser = null;    // ❌ Blocked
store.newProp = 123;     // ❌ Blocked

IMPORTANT:
Freeze is SHALLOW.

Below  still works:

store.users.push(user);  // ✅ Allowed

Because the array itself is not frozen.


PROS:
- Protects public API.
- Prevents accidental mutation.
- Makes Singleton stricter and safer.

CONS:
- Cannot add new properties later (e.g., this.subscribers for Observer pattern).
- Still allows mutation of nested objects.
- Reduces architectural flexibility.


Conclusion:
Useful for libraries or strict systems.
Not usually required for growing applications.


------------------------------------------------------------
3️⃣ Object.freeze(UserStore) → Freeze CLASS
------------------------------------------------------------

If added outside class:

Object.freeze(UserStore);

What It Prevents:

UserStore.getInstance = null;   // ❌ Blocked
UserStore.newStaticProp = 1;    // ❌ Blocked

BUT it does NOT protect instances:

const store = UserStore.getInstance();
store.users = [];               // ✅ Still allowed (unless instance frozen)


PROS:
- Protects static API.
- Prevents class-level tampering.
- Useful in framework/library design.

CONS:
- Does NOT protect instance properties.
- Rarely needed in application-level code.
- Prevents adding new static methods later.


Conclusion:
Mostly useful for framework authors.
Not commonly needed in dashboard apps.


------------------------------------------------------------
ARCHITECTURAL SUMMARY
------------------------------------------------------------

No Freeze:
✔ Flexible
✔ Easy to extend
✘ Less protected

Freeze Instance:
✔ Protects API
✘ Shallow protection
✘ Limits future extensibility

Freeze Class:
✔ Protects static methods
✘ Does not protect instance
✘ Rarely needed in apps


------------------------------------------------------------
FINAL RECOMMENDATION (For This Dashboard Project)
------------------------------------------------------------

Do NOT freeze yet.

Instead:
- Keep state private.
- Return copies in getters.
- Control mutations through methods.

Freeze is more useful in:
- Libraries
- Frameworks
- Immutable architecture systems

============================================================
END OF NOTES
============================================================
*/
