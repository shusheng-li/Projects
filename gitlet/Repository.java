package gitlet;

import java.io.File;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.ArrayList;
import java.util.LinkedList;


import static gitlet.Utils.*;


/**
 * Represents a gitlet repository.
 * This contains all the calls to each method in the command line.
 *
 * @author Shusheng Li
 */

@SuppressWarnings("SpellCheckingInspection")
public class Repository {
    /**
    * List all instance variables of the Repository class here with a useful
    * comment above them describing what that variable represents and how that
    * variable is used. We've provided two examples for you.
    *

    /** The UID for the very first commit instance, parent of the next commit. */
    static String initial_UID;


    /** The current working directory. */
    public static final File CWD = new File(System.getProperty("user.dir"));
    /** The .gitlet directory. */
    public static final File GITLET_DIR = join(CWD, ".gitlet");

    /** Necessary folders inside the .gitlet folder */
    public static final File STAGINGAREA = join(GITLET_DIR, "STAGINGAREA");
    public static final File COMMITS = join(GITLET_DIR, "COMMITS");
    public static final File BLOBS = join(GITLET_DIR, "BLOBS");
    public static final File BRANCHES = join(GITLET_DIR, "BRANCHES");
    public static final File REMOTES = join(GITLET_DIR, "REMOTES");

    /** Necessary folders inside the stagingArea folder. */
    public static final File STAGEDFORADDITION = join(STAGINGAREA, "STAGEDFORADDITION");
    public static final File STAGEDFORREMOVAL = join(STAGINGAREA, "STAGEDFORREMOVAL");

    /** Necessary files inside the COMMITS folder to keep track of branching. */
    public static final File MASTER = join(BRANCHES, "master");
    public static final File HEAD = join(BRANCHES, "HEAD");


    private static void setUpPersistence() {
        STAGINGAREA.mkdirs();
        STAGEDFORADDITION.mkdirs();
        STAGEDFORREMOVAL.mkdirs();
        COMMITS.mkdirs();
        BLOBS.mkdirs();
        BRANCHES.mkdirs();
        REMOTES.mkdirs();
    }

    public static void init() {
        if (GITLET_DIR.exists()) {
            System.out.println("A Gitlet "
                    + "version-control system already exists in the current directory.");
            return;
        }
        setUpPersistence();
        Commit initial = new Commit("initial commit", null,
                "Thu Jan 1 00:00:00 1970 -8000", new HashMap<>());
        initial_UID = initial.getCommitUID();
        writeContents(MASTER, initial_UID);
        writeContents(HEAD, "master");
    }

    public static void add(String fileName) {
        File file = join(CWD, fileName);
        if (!file.exists()) {
            System.out.println("File does not exist.");
            return;
        }
        File addFile = join(STAGEDFORADDITION, fileName);
        File removeFile = join(STAGEDFORREMOVAL, fileName);
        String fileUID = sha1(readContents(file));
        File blobFile = join(BLOBS, fileUID);
        String currUID = readContentsAsString(headBranch());
        Commit currCommit = Commit.fromFile(currUID);
        if (removeFile.exists()) {
            removeFile.delete();
        }
        if (fileUID.equals(currCommit.getMap().get(fileName))) {
            if (addFile.exists()) {
                addFile.delete();
            }
        } else {
            writeContents(addFile, fileUID);
            writeContents(blobFile, readContents(file));
        }
    }

    public static void commit(String message) {
        if (message.equals("") || message == null) {
            System.out.println("Please enter a commit message.");
            return;
        }
        String curUID = readContentsAsString(headBranch());
        Commit curCommit = Commit.fromFile((curUID));
        List<String> fileAdditionListing = plainFilenamesIn(STAGEDFORADDITION);
        List<String> fileRemovalListing = plainFilenamesIn(STAGEDFORREMOVAL);
        HashMap<String, String> map = new HashMap<>(curCommit.getMap());
        if (fileAdditionListing.isEmpty() && fileRemovalListing.isEmpty()) {
            System.out.println("No changes added to the commit.");
            return;
        }
        for (String fileName: fileAdditionListing) {
            File file = join(STAGEDFORADDITION, fileName);
            String fileUID = readContentsAsString(file);
            map.put(fileName, fileUID);
            file.delete();
        }
        for (String fileName: fileRemovalListing) {
            File file = join(STAGEDFORREMOVAL, fileName);
            map.remove(fileName);
            file.delete();
        }
        Commit newCommit = new Commit(message, curUID, Commit.getTime(), map);
        String commitUID = newCommit.getCommitUID();
        writeContents(headBranch(), commitUID);
    }

    private static File headBranch() {
        String branchName = readContentsAsString(HEAD);
        File branch = join(BRANCHES, branchName);
        return branch;
    }

    public static void rm(String filename) {
        File file = join(CWD, filename);
        File stagedRemFile = join(STAGEDFORREMOVAL, filename);
        File stagedAddFile = join(STAGEDFORADDITION, filename);
        Commit currCommit = Commit.fromFile(readContentsAsString(headBranch()));
        String fileUID = currCommit.getMap().get(filename);
        boolean didJob = false;
        if (stagedAddFile.exists()) {
            stagedAddFile.delete();
            didJob = true;
        }
        if (currCommit.getMap().containsKey(filename)) {
            writeContents(stagedRemFile, fileUID);
            file.delete();
            didJob = true;
        }
        if (!didJob) {
            System.out.println("No reason to remove the file.");
        }
    }

    public static void log() {
        Commit headCommit = Commit.fromFile(readContentsAsString(headBranch()));
        logHelper1(headCommit);
    }

    private static void logHelper1(Commit head) {
        logHelper2(head);
        if (head.getParent() != null) {
            Commit parentCommit = Commit.fromFile(head.getParent());
            logHelper1(parentCommit);
        } else if (!head.getParent1().equals("doesn't exist")) {
            Commit parentCommit = Commit.fromFile(head.getParent1());
            logHelper1(parentCommit);
        }
    }
    private static void logHelper2(Commit curr) {
        String merge = "";
        if (!curr.getParent1().equals("doesn't exist")) {
            merge = String.format("Merge: %1$s %2$s"
                        + "\n",
                    curr.getParent1().substring(0, 7), curr.getParent2().substring(0, 7));
        }
        String commit = String.format("==="
                        + "\n"
                        + "commit %1$s"
                        + "\n",
                curr.getCommitUID());
        String rest = String.format("Date: %1$s"
                        + "\n"
                        + "%2$s"
                        + "\n",
                curr.getTimeStamp(), curr.getMessage());
        System.out.println(commit + merge + rest);
    }

    public static void globalLog() {
        List<String> allCommits = plainFilenamesIn(COMMITS);
        for (String commitUID: allCommits) {
            Commit commit = Commit.fromFile(commitUID);
            logHelper2(commit);
        }
    }

    public static void find(String message) {
        List<String> allCommits = plainFilenamesIn(COMMITS);
        boolean found = false;
        for (String commitUID: allCommits) {
            Commit commit = Commit.fromFile(commitUID);
            if (commit.getMessage().equals(message)) {
                found = true;
                System.out.println(commit.getCommitUID());
            }
        }
        if (!found) {
            System.out.println("Found no commit with that message.");
        }
    }

    public static void checkout(String filler, String fileName) {
        File file = join(CWD, fileName);
        Commit commit = Commit.fromFile(readContentsAsString(headBranch()));
        if (!commit.getMap().containsKey(fileName)) {
            System.out.println("File does not exist in that commit.");
            return;
        }
        String fileUID = commit.getMap().get(fileName);
        File blob = join(BLOBS, fileUID);
        writeContents(file, readContents(blob));
    }

    public static void checkout(String commitUID, String filler, String fileName) {
        File file = join(CWD, fileName);
        boolean exist = false;
        for (String longUID: plainFilenamesIn(COMMITS)) {
            if (longUID.startsWith(commitUID)) {
                commitUID = longUID;
                exist = true;
            }
        }
        if (!exist) {
            System.out.print("No commit with that id exists.");
            return;
        }
        Commit commit = Commit.fromFile(commitUID);
        if (!commit.getMap().containsKey(fileName)) {
            System.out.println("File does not exist in that commit.");
            return;
        }
        String fileUID = commit.getMap().get(fileName);
        File blob = join(BLOBS, fileUID);
        writeContents(file, readContents(blob));
    }

    public static void checkout(String branchName) {
        branchName = branchName.replace("/", " ");
        File branch = join(BRANCHES, branchName);
        if (!branch.exists()) {
            System.out.println("No such branch exists.");
            return;
        }
        Commit givenCommit = Commit.fromFile(readContentsAsString(branch));
        if (checkUntrackedFilesAndOverWritten(givenCommit)) {
            System.out.println("There is an untracked file in the way; delete it, "
                    + "or add and commit it first.");
            return;
        }
        String headBranch = readContentsAsString(HEAD);
        if (headBranch.equals(branchName)) {
            System.out.println("No need to checkout the current branch.");
            return;
        }
        //changes file content in CWD
        String commitUID = readContentsAsString(branch);
        checkoutBranchHelper(commitUID);
        writeContents(HEAD, branchName);
    }

    private static void checkoutBranchHelper(String commitUID) {
        Commit givenCommit = Commit.fromFile(commitUID);
        for (Map.Entry<String, String> eachFile: givenCommit.getMap().entrySet()) {
            String fileName = eachFile.getKey();
            String fileUID = eachFile.getValue();
            File file = join(CWD, fileName);
            File blob = join(BLOBS, fileUID);
            writeContents(file, readContents(blob));
        }
        //delete files in CWD that would get overwritten and not preset in the checkout branch
        for (String fileName: plainFilenamesIn(CWD)) {
            File eachFile = join(CWD, fileName);
            Commit curr = Commit.fromFile(readContentsAsString(headBranch()));
            if (curr.getMap().containsKey(fileName)
                    && !givenCommit.getMap().containsKey(fileName)) {
                eachFile.delete();
            }
        }
        clearStagingArea();
    }

    private static boolean checkUntrackedFilesAndOverWritten(Commit givenCommit) {
        Commit curr = Commit.fromFile(readContentsAsString(headBranch()));
        for (String fileName: plainFilenamesIn(CWD)) {
            if (!curr.getMap().containsKey(fileName)
                    && givenCommit.getMap().containsKey(fileName)) {
                return true;
            }
        }
        return false;
    }

    private static void clearStagingArea() {
        for (String addFile: plainFilenamesIn(STAGEDFORADDITION)) {
            File removeAddFile = join(STAGEDFORADDITION, addFile);
            removeAddFile.delete();
        }
        for (String remFile: plainFilenamesIn(STAGEDFORREMOVAL)) {
            File removeRemFile = join(STAGEDFORREMOVAL, remFile);
            removeRemFile.delete();
        }
    }

    public static void branch(String branchName) {
        File branch = join(BRANCHES, branchName);
        if (branch.exists()) {
            System.out.println("A branch with that name already exists.");
        } else {
            String headUID = readContentsAsString(headBranch());
            writeContents(branch, headUID);
        }
    }

    public static void rmBranch(String branchName) {
        File branch = join(BRANCHES, branchName);
        String head = readContentsAsString(HEAD);
        if (!branch.exists()) {
            System.out.println("A branch with that name does not exist.");
        } else if (head.equals(branchName)) {
            System.out.println("Cannot remove the current branch.");
        } else {
            branch.delete();
        }
    }

    public static void reset(String commitUID) {
        File commit = join(COMMITS, commitUID);
        if (!commit.exists()) {
            System.out.println("No commit with that id exists.");
            return;
        }
        Commit givenCommit = Commit.fromFile(commitUID);
        if (checkUntrackedFilesAndOverWritten(givenCommit)) {
            System.out.println("There is an untracked file in the way; "
                    + "delete it, or add and commit it first.");
        } else {
            checkoutBranchHelper(commitUID);
            writeContents(headBranch(), commitUID);
        }
    }

    public static void merge(String branchName) {
        checkFailureCases(branchName);
        HashSet<String> curComSet = new HashSet<>();
        Commit curHeadCom = Commit.fromFile(readContentsAsString(headBranch()));
        addToSet(curComSet, curHeadCom);
        HashSet<String> givBranchSet = new HashSet<>();
        Commit branchCommit = Commit.fromFile(readContentsAsString(join(BRANCHES, branchName)));
        if (checkUntrackedFilesAndOverWritten(branchCommit)) {
            System.out.println("There is an untracked file in the way; "
                    + "delete it, or add and commit it first.");
            return;
        }
        addToSet(givBranchSet, branchCommit);
        if (curComSet.contains(branchCommit.getCommitUID())) {
            System.out.println("Given branch is an ancestor of the current branch.");
            return;
        } else if (givBranchSet.contains(curHeadCom.getCommitUID())) {
            checkout(branchName);
            System.out.println("Current branch fast-forwarded.");
            return;
        }
        String splitPoint = findSplit(curComSet, branchCommit);
        Commit splitCom = Commit.fromFile(splitPoint);
        HashMap<String, String> branchComMap = branchCommit.getMap();
        HashMap<String, String> curComMap = curHeadCom.getMap();
        HashMap<String, String> splitMap = splitCom.getMap();
        for (Map.Entry<String, String> eachFile : splitMap.entrySet()) {
            String fileName = eachFile.getKey();
            String fileUID = eachFile.getValue();
            if (branchComMap.containsKey(fileName) && curComMap.containsKey(fileName)
                    && !branchComMap.containsValue(fileUID) && curComMap.containsValue(fileUID)) {
//                System.out.println("1");
                checkoutAndAdd(branchCommit.getCommitUID(), fileName);
            } else if (branchComMap.containsKey(fileName) && curComMap.containsKey(fileName)
                    && !curComMap.containsValue(fileUID) && branchComMap.containsValue(fileUID)) {
//                System.out.println("2");
                continue;
            } else if (!curComMap.containsValue(fileUID) && !branchComMap.containsValue(fileUID)) {
                if ((!curComMap.containsKey(fileName) && !branchComMap.containsKey(fileName))
                        || (curComMap.containsKey(fileName)
                        && curComMap.get(fileName).equals(branchComMap.get(fileName)))) {
//                    System.out.println("3");
                    continue;
                } else {
//                    System.out.println("8");
                    File curComBlob;
                    File branchComBlob;
                    File blank = join(BLOBS, "blank");
                    writeContents(blank, "");
                    if (!curComMap.containsKey(fileName) && !branchComMap.containsKey(fileName)) {
                        curComBlob = join(BLOBS, "blank");
                        branchComBlob = join(BLOBS, "blank");
                    } else if (!curComMap.containsKey(fileName)) {
                        curComBlob = join(BLOBS, "blank");
                        branchComBlob = join(BLOBS, branchComMap.get(fileName));
                    } else if (!branchComMap.containsKey(fileName)) {
                        branchComBlob = join(BLOBS, "blank");
                        curComBlob = join(BLOBS, curComMap.get(fileName));
                    } else {
                        curComBlob = join(BLOBS, curComMap.get(fileName));
                        branchComBlob = join(BLOBS, branchComMap.get(fileName));
                    }
                    conflict(curComBlob, branchComBlob, fileName);
                }
            } else if (curComMap.containsValue(fileUID) && !branchComMap.containsKey(fileName)) {
//                System.out.println("6");
                rm(fileName);
            } else if (branchComMap.containsValue(fileUID) && !curComMap.containsKey(fileName)) {
//                System.out.println("7");
                continue;
            }
        }
        checkBranchMap(branchComMap, curComMap, splitMap, branchName);
        checkCurMap(branchComMap, curComMap, splitMap);
        String commitMessage = String.format("Merged %1$s into %2$s.",
                branchName.replace(" ", "/"), readContentsAsString(HEAD));
        commit2(commitMessage, readContentsAsString(join(BRANCHES, branchName)));
    }
    private static void checkBranchMap(HashMap<String, String> branchComMap,
                                       HashMap<String, String> curComMap,
                                       HashMap<String, String> splitMap, String branchName) {
        for (Map.Entry<String, String> eachFile : branchComMap.entrySet()) {
            String branchFileName = eachFile.getKey();
            String branchFileUID = eachFile.getValue();
            if (!splitMap.containsKey(branchFileName)) {
                if (!curComMap.containsKey(branchFileName)) {
//                    System.out.println("5");
                    String branchComUID = readContentsAsString(join(BRANCHES, branchName));
                    checkoutAndAdd(branchComUID, branchFileName);
                } else if (!branchFileUID.equals(curComMap.get(branchFileName))) {
//                    System.out.println("8");
                    File curComBlob = join(BLOBS, curComMap.get(branchFileName));
                    File branchComBlob = join(BLOBS, branchComMap.get(branchFileName));
                    conflict(curComBlob, branchComBlob, branchFileName);
                }
            }
        }
    }
    private static void checkCurMap(HashMap<String, String> branchComMap,
                                    HashMap<String, String> curComMap,
                                    HashMap<String, String> splitMap) {
        for (Map.Entry<String, String> eachFile : curComMap.entrySet()) {
            String curFileName = eachFile.getKey();
            String curFileUID = eachFile.getValue();
            if (!splitMap.containsKey(curFileName) && !branchComMap.containsKey(curFileName)) {
                if (!branchComMap.containsKey(curFileName)) {
//                    System.out.println("4");
                    continue;
                } else if (!curFileUID.equals(branchComMap.get(curFileName))) {
//                    System.out.println("8");
                    File curComBlob = join(BLOBS, curComMap.get(curFileName));
                    File branchComBlob = join(BLOBS, branchComMap.get(curFileName));
                    conflict(curComBlob, branchComBlob, curFileName);
                }
            }
        }
    }

    private static void checkFailureCases(String branchName) {
        if (!plainFilenamesIn(STAGEDFORADDITION).isEmpty()
                || !plainFilenamesIn(STAGEDFORREMOVAL).isEmpty()) {
            System.out.println("You have uncommitted changes.");
            System.exit(0);
        }
        File branch = join(BRANCHES, branchName);
        if (!branch.exists()) {
            System.out.println("A branch with that name does not exist.");
            System.exit(0);
        }
        if (readContentsAsString(HEAD).equals(branchName)) {
            System.out.println("Cannot merge a branch with itself.");
            System.exit(0);
        }
    }
//    private static String findSplit(HashSet<String> curComSet, Commit branchCommit) {
//        String splitPoint = null;
//        boolean found = false;
//        Commit randomBranchCommit = Commit.fromFile(branchCommit.getParent());
//        while (!found) {
//            if (curComSet.contains(randomBranchCommit.getCommitUID())) {
//                found = true;
//                splitPoint = randomBranchCommit.getCommitUID();
//            } else {
//                randomBranchCommit = Commit.fromFile(randomBranchCommit.getParent());
//            }
//        }
//        return splitPoint;
//    }
    private static String findSplit(HashSet<String> curComSet, Commit branchCommit) {
        ArrayList<String> list = new ArrayList<>();
        priorityList(branchCommit, list);
        String splitCommit = null;
        for (String branchCommitUID: list) {
            if (curComSet.contains(branchCommitUID)) {
                splitCommit = branchCommitUID;
                return splitCommit;
            }
        }
        return "It will never hit this :)";
    }
    private static void priorityList(Commit branchCommit, ArrayList<String> list) {
        HashSet<String> marked = new HashSet<>();
        Queue<String> q = new LinkedList<>();
        q.add(branchCommit.getCommitUID());
        marked.add(branchCommit.getCommitUID()); //marked
        while (!q.isEmpty()) {
            String commitUID = q.remove();
            for (String parentUID : parentList(Commit.fromFile(commitUID))) {
                if (!marked.contains(parentUID)) {
                    q.add(parentUID);
                    list.add(parentUID);
                    marked.add(parentUID);
                }
            }
        }
    }
    private static List<String> parentList(Commit commit) {
        List<String> parents = new ArrayList<>();
        if (commit.getParent() != null) {
            Commit parent = Commit.fromFile(commit.getParent());
            parents.add(parent.getCommitUID());
        } else if (!commit.getParent1().equals("doesn't exist")) {
            Commit parent1 = Commit.fromFile(commit.getParent1());
            Commit parent2 = Commit.fromFile(commit.getParent2());
            parents.add(parent1.getCommitUID());
            parents.add(parent2.getCommitUID());
        }
        return parents;
    }
    private static void addToSet(HashSet<String> set, Commit commit) {
        set.add(commit.getCommitUID());
        if (commit.getParent() != null) {
            Commit parent = Commit.fromFile(commit.getParent());
            addToSet(set, parent);
        } else if (!commit.getParent1().equals("doesn't exist")) {
            Commit parent1 = Commit.fromFile(commit.getParent1());
            Commit parent2 = Commit.fromFile(commit.getParent2());
            addToSet(set, parent1);
            addToSet(set, parent2);
        }
    }
    private static void checkoutAndAdd(String commitUID, String branchFileName) {
        checkout(commitUID, "--", branchFileName);
        add(branchFileName);
    }
    private static void conflict(File curFile, File branchFile, String fileName) {
        String content  = String.format("<<<<<<< HEAD"
                + "\n"
                + "%1$s"
                + "======="
                + "\n"
                + "%2$s"
                + ">>>>>>>"
                + "\n",
                readContentsAsString(curFile), readContentsAsString(branchFile));
        File file = join(CWD, fileName);
        writeContents(file, content);
        String fileUID = sha1(content);
        File blob = join(BLOBS, fileUID);
        writeContents(blob, readContents(file));
        File addFile = join(STAGEDFORADDITION, fileName);
        writeContents(addFile, fileUID);
        System.out.println("Encountered a merge conflict.");
    }
    private static void commit2(String message, String branchUID) { //really?
        if (message == null) {
            System.out.println("Please enter a commit message.");
            return;
        }
        String curUID = readContentsAsString(headBranch());
        Commit curCommit = Commit.fromFile((curUID));
        List<String> fileAdditionListing = plainFilenamesIn(STAGEDFORADDITION);
        List<String> fileRemovalListing = plainFilenamesIn(STAGEDFORREMOVAL);
        HashMap<String, String> map = curCommit.getMap();
        if (fileAdditionListing.isEmpty() && fileRemovalListing.isEmpty()) {
            System.out.println("No changes added to the commit.");
            return;
        }
        for (String fileName: fileAdditionListing) {
            File file = join(STAGEDFORADDITION, fileName);
            String fileUID = readContentsAsString(file);
            map.put(fileName, fileUID);
            file.delete();
        }
        for (String fileName: fileRemovalListing) {
            File file = join(STAGEDFORREMOVAL, fileName);
            map.remove(fileName);
            file.delete();
        }

        Commit newCommit = new Commit(message, curUID, branchUID, Commit.getTime(), map);
        String commitUID = newCommit.getCommitUID();
        writeContents(headBranch(), commitUID);
    }

    public static void status() {
        System.out.println("=== Branches ===");
        printBranches();
        System.out.println();
        System.out.println("=== Staged Files ===");
        printStagedFiles();
        System.out.println();
        System.out.println("=== Removed Files ===");
        printRemovedFiles();
        System.out.println();
        System.out.println("=== Modifications Not Staged For Commit ===");
        printModifiedFiles();
        System.out.println();
        System.out.println("=== Untracked Files ===");
        printUntrackedFiles();
        System.out.println();
    }

    private static void printBranches() {
        String headBranch = readContentsAsString(HEAD);
        System.out.println("*" + headBranch);
        List<String> branchList = (plainFilenamesIn(BRANCHES));
        Collections.sort(branchList);
        for (String branchName: branchList) {
            if (!branchName.equals(headBranch) && !branchName.equals("HEAD")) {
                System.out.println(branchName);
            }
        }
    }
    private static void printStagedFiles() {
        List<String> fileAdditionListing = (plainFilenamesIn(STAGEDFORADDITION));
        Collections.sort(fileAdditionListing);
        for (String addFileName: fileAdditionListing) {
            System.out.println(addFileName);
        }
    }
    private static void printRemovedFiles() {
        List<String> fileRemovalListing = (plainFilenamesIn(STAGEDFORREMOVAL));
        Collections.sort(fileRemovalListing);
        for (String remFileName: fileRemovalListing) {
            System.out.println(remFileName);
        }
    }
    private static void printModifiedFiles() {
        Commit headCommit = Commit.fromFile(readContentsAsString(headBranch()));
        HashMap<String, String> map = headCommit.getMap();
        List<String> cwdList = plainFilenamesIn(CWD);
        Collections.sort(cwdList);
        for (String fileName: cwdList) {
            File file = join(CWD, fileName);
            File addFile = join(STAGEDFORADDITION, fileName);
            File remFile = join(STAGEDFORREMOVAL, fileName);
            String fileUID = sha1(readContents(file));
            if (map.containsKey(fileName)
                    && !map.containsValue(fileUID)
                    && !addFile.exists() && !remFile.exists()) {
                System.out.println(fileName + " (modified)");
            } else if (addFile.exists()) {
                String addFileUID = readContentsAsString(addFile);
                if (!fileUID.equals(addFileUID)) {
                    System.out.println(fileName + " (modified)");
                }
            }
        }
        List<String> addList = plainFilenamesIn(STAGEDFORADDITION);
        Collections.sort(addList);
        for (String addFileName: addList) {
            File cwdFile = join(CWD, addFileName);
            if (!cwdFile.exists()) {
                System.out.println(addFileName + " (deleted)");
            }
        }
        for (Map.Entry<String, String> eachFile: map.entrySet()) {
            String fileName = eachFile.getKey();
            File remFile = join(STAGEDFORREMOVAL, fileName);
            File cwdFile = join(CWD, fileName);
            if (!remFile.exists() && !cwdFile.exists()) {
                System.out.println(fileName + " (deleted)");
            }
        }
    }
    private static void printUntrackedFiles() {
        List<String> cwdList = plainFilenamesIn(CWD);
        Collections.sort(cwdList);
        for (String fileName : cwdList) {
            File addFile = join(STAGEDFORADDITION, fileName);
            Commit commit = Commit.fromFile(readContentsAsString(headBranch()));
            Map<String, String> commitMap = commit.getMap();
            File remFile = join(STAGEDFORREMOVAL, fileName);
            if (!addFile.exists() && !commitMap.containsKey(fileName)) {
                System.out.println(fileName);
            }
        }
    }

    /** remote commands. */
    public static void addRemote(String remoteName, String path) {
        path = path.replace("/", java.io.File.separator);
        File remote = join(REMOTES, remoteName);
        if (remote.exists()) {
            System.out.println("A remote with that name already exists.");
        } else {
            writeContents(remote, path);
        }
    }

    public static void rmRemote(String remoteName) {
        File remote = join(REMOTES, remoteName);
        if (!remote.exists()) {
            System.out.println("A remote with that name does not exist.");
        } else {
            remote.delete();
        }
    }

    public static void push(String remoteName, String remoteBranchName) {
        File remote = join(REMOTES, remoteName);
        File otherGitlet = join(CWD, readContentsAsString(remote));
        if (!otherGitlet.exists()) {
            System.out.println("Remote directory not found.");
            return;
        }
        File remoteBranches = join(otherGitlet, "BRANCHES");
        File remoteBranch = join(remoteBranches, remoteBranchName);
        String remoteHeadCommit = readContentsAsString(remoteBranch);
        String curHeadCommit = readContentsAsString(headBranch());
        ArrayList<String> freshCommits = new ArrayList<>();
        boolean contains = newCommitsList1(curHeadCommit, remoteHeadCommit, freshCommits);
        if (!contains) {
            if (!remoteBranch.exists()) {
                addNewCommits(otherGitlet, freshCommits);
                writeContents(remoteBranch, curHeadCommit);
            } else {
                System.out.println("Please pull down remote changes before pushing.");
            }
        } else {
            addNewCommits(otherGitlet, freshCommits);
            writeContents(remoteBranch, curHeadCommit);
        }
    }

    private static boolean newCommitsList1(String curHeadCommit, String remoteHeadCommit,
                                                    ArrayList<String> list) {
        if (curHeadCommit == null) {
            return false;
        }
        if (curHeadCommit.equals(remoteHeadCommit)) {
            return true;
        } else {
            list.add(curHeadCommit);
            String parentCommit = Commit.fromFile(curHeadCommit).getParent();
            return newCommitsList1(parentCommit, remoteHeadCommit, list);
        }
    }
    private static void addNewCommits(File otherGitlet, ArrayList<String> freshCommits) {
        File remoteCommits = join(otherGitlet, "COMMITS");
        File remoteBranches = join(otherGitlet, "BRANCHES");
        for (String commitUID: freshCommits) {
            File newCommit = join(remoteCommits, commitUID);
            File commit = join(COMMITS, commitUID);
            writeContents(newCommit, readContents(commit));
            File remoteHead = join(remoteBranches, "HEAD");
            writeContents(remoteHead, readContentsAsString(HEAD));
            Commit givenCommit = Commit.fromFile(commitUID);
            for (Map.Entry<String, String> eachFile: givenCommit.getMap().entrySet()) {
                String fileUID = eachFile.getValue();
                File remoteBlobs = join(otherGitlet, "BLOBS");
                File remoteBlob = join(remoteBlobs, fileUID);
                File blob = join(BLOBS, fileUID);
                writeContents(remoteBlob, readContents(blob));
            }
        }
    }

    public static void fetch(String remoteName, String remoteBranchName) {
        File remote = join(REMOTES, remoteName);
        File otherGitlet = join(CWD, readContentsAsString(remote));
        if (!otherGitlet.exists()) {
            System.out.println("Remote directory not found.");
            return;
        }
        File remoteBranches = join(otherGitlet, "BRANCHES");
        File remoteBranch = join(remoteBranches, remoteBranchName);
        if (!remoteBranch.exists()) {
            System.out.println("That remote does not have that branch.");
            return;
        }
        String remoteHeadCommit = readContentsAsString(remoteBranch);
        String curHeadCommit = readContentsAsString(headBranch());
        ArrayList<String> freshCommits = new ArrayList<>();
        newCommitsList2(curHeadCommit, remoteHeadCommit, freshCommits, remoteName);
        File remoteCommits = join(otherGitlet, "COMMITS");
        File branch = join(BRANCHES, remoteName + " " + remoteBranchName);
        for (String commitUID : freshCommits) {
            File newCommit = join(COMMITS, commitUID);
            File commit = join(remoteCommits, commitUID);
            writeContents(newCommit, readContents(commit));
            Commit givenCommit = Commit.fromFile(commitUID);
            for (Map.Entry<String, String> eachFile : givenCommit.getMap().entrySet()) {
                String fileUID = eachFile.getValue();
                File remoteBlobs = join(otherGitlet, "BLOBS");
                File remoteBlob = join(remoteBlobs, fileUID);
                File blob = join(BLOBS, fileUID);
                writeContents(blob, readContents(remoteBlob));
            }
        }
        writeContents(branch, remoteHeadCommit);
    }
    private static void newCommitsList2(String curHeadCommit, String remoteHeadCommit,
                                        ArrayList<String> list, String remoteName) {
        if (remoteHeadCommit == null) {
            return;
        }
        if (remoteHeadCommit.equals(curHeadCommit)) {
            return;
        } else {
            list.add(remoteHeadCommit);
            File remote = join(REMOTES, remoteName);
            File otherGitlet = join(CWD, readContentsAsString(remote));
            File otherCommits = join(otherGitlet, "COMMITS");
            File remoteCommit = join(otherCommits, remoteHeadCommit);
            String parentCommit = readObject(remoteCommit, Commit.class).getParent();
            newCommitsList2(curHeadCommit, parentCommit, list, remoteName);
        }
    }

    public static void pull(String remoteName, String remoteBranchName) {
        fetch(remoteName, remoteBranchName);
        merge(remoteName + " " + remoteBranchName);
    }
}
