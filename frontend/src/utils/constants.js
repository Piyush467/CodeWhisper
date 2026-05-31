export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' }
];

export const INITIAL_CODE_TEMPLATES = {
  javascript: `// Paste your code here to get it reviewed
function findUser(users, id) {
  let found = null;
  for(var i=0; i<users.length; i++) {
    if(users[i].id == id) {
      found = users[i];
    }
  }
  // Vulnerability: returns reference or potential crash if users null
  return found;
}`,
  python: `# Paste your Python code here
def get_user_details(user_id, database_conn):
    # Security Alert: SQL Injection Risk
    cursor = database_conn.cursor()
    query = "SELECT * FROM users WHERE id = " + str(user_id)
    cursor.execute(query)
    return cursor.fetchone()`,
  java: `// Paste your Java code here
public class UserManager {
    // Logic Bug & Threading issue
    private static UserManager instance;
    
    public static UserManager getInstance() {
        if (instance == null) {
            instance = new UserManager();
        }
        return instance;
    }
}`,
  rust: `// Paste your Rust code here
fn load_configs(path: &str) -> String {
    // Missing error handling
    let data = std::fs::read_to_string(path).unwrap();
    data
}`
};
