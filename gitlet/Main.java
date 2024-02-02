package gitlet;

/** Driver class for Gitlet, a subset of the Git version-control system.
 *  @author Shusheng Li
 */
public class Main {

    /** Usage: java gitlet.Main ARGS, where ARGS contains
     *  <COMMAND> <OPERAND1> <OPERAND2> ... 
     */
    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("Please enter a command.");
            return;
        }
        String firstArg = args[0];
        switch (firstArg) {
            case "init":
                validateOperandsAndInitialization("init", args, 1);
                Repository.init();
                break;
            case "add":
                validateOperandsAndInitialization("add", args, 2);
                Repository.add(args[1]);
                break;
            case "commit":
                validateOperandsAndInitialization("commit", args, 2);
                Repository.commit(args[1]);
                break;
            case "rm":
                validateOperandsAndInitialization("rm", args, 2);
                Repository.rm(args[1]);
                break;
            case "log":
                validateOperandsAndInitialization("log", args, 1);
                Repository.log();
                break;
            case "global-log":
                validateOperandsAndInitialization("global-log", args, 1);
                Repository.globalLog();
                break;
            case "find":
                validateOperandsAndInitialization("find", args, 2);
                Repository.find(args[1]);
                break;
            case "status":
                validateOperandsAndInitialization("status", args, 1);
                Repository.status();
                break;
            case "checkout":
                if (args.length == 3 && args[1].equals("--")) {
                    validateOperandsAndInitialization("checkout", args, 3);
                    Repository.checkout(args[1], args[2]);
                } else if (args.length == 4 && args[2].equals("--")) {
                    validateOperandsAndInitialization("checkout", args, 4);
                    Repository.checkout(args[1], args[2], args[3]);
                } else if (args.length == 2) {
                    validateOperandsAndInitialization("checkout", args, 2);
                    Repository.checkout(args[1]);
                } else {
                    System.out.println("Incorrect operands.");
                }
                break;
            case "branch":
                validateOperandsAndInitialization("branch", args, 2);
                Repository.branch(args[1]);
                break;
            case "rm-branch":
                validateOperandsAndInitialization("rm-branch", args, 2);
                Repository.rmBranch(args[1]);
                break;
            case "reset":
                validateOperandsAndInitialization("reset", args, 2);
                Repository.reset(args[1]);
                break;
            case "merge":
                validateOperandsAndInitialization("merge", args, 2);
                Repository.merge(args[1]);
                break;
            /** remote commands */
            case "add-remote":
                Repository.addRemote(args[1], args[2]);
                break;
            case "rm-remote":
                Repository.rmRemote(args[1]);
                break;
            case "push":
                Repository.push(args[1], args[2]);
                break;
            case "fetch":
                Repository.fetch(args[1], args[2]);
                break;
            case "pull":
                Repository.pull(args[1], args[2]);
                break;
            default:
                System.out.println("No command with that name exists.");
        }
        return;
    }

    public static void validateOperandsAndInitialization(String cmd, String[] args, int n) {
        if (args.length != n) {
            System.out.println("Incorrect operands.");
            System.exit(0);
        }
        if (!cmd.equals("init") && !Repository.HEAD.exists()) {
            System.out.println(String.format("Not in an initialized Gitlet directory."));
            System.exit(0);
        }
    }
}
