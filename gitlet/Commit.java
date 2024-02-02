package gitlet;


import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.io.File;

import static gitlet.Utils.*;

/**
 * Represents a gitlet commit object that can be serialized.
 * When making a commit instance, it will save the UID to the COMMITS folder.
 *
 * @author Shusheng Li
 */
public class Commit implements Serializable {
    /**
     * List all instance variables of the Commit class here with a useful
     * comment above them describing what that variable represents and how that
     * variable is used. We've provided one example for `message`.
     */
    /** The parent commit of a normal commit */
    private String parent;

    /** Parents of a merge commit */
    private String parent1 = "doesn't exist";
    private String parent2 = "doesn't exist";

    /** Records time stamp */
    private String timeStamp;

    /** The message of this Commit. */
    private String message;

    /** A hashmap that keeps track of all the different versions of a file. */
    private HashMap<String, String> map;

    /** A unique UID for each different commit. */
    private String commitUID;


    public Commit(String message, String parent, String timeStamp, HashMap<String, String> map) {
        this.message = message;
        this.parent = parent;
        this.timeStamp = timeStamp;
        this.map = map;
        saveCommit();
    }

    public Commit(String message, String parent1, String parent2,
                  String timeStamp, HashMap<String, String> map) {
        this.message = message;
        this.parent1 = parent1;
        this.parent2 = parent2;
        this.timeStamp = timeStamp;
        this.map = map;
        saveCommit();
    }

    public void saveCommit() {
        byte[] content = serialize(this);
        commitUID = sha1(content);
        File commit = join(Repository.COMMITS, this.commitUID);
        writeObject(commit, this);
    }

    public static Commit fromFile(String cUID) {
        File commit = join(Repository.COMMITS, cUID);
        return readObject(commit, Commit.class);
    }

    public static String getTime() {
        SimpleDateFormat format = new SimpleDateFormat("EEE MMM d HH:mm:ss yyyy Z");
//        format.setTimeZone(TimeZone.getTimeZone("PST"));
        String timestamp = format.format(new Date());
        return timestamp;
    }

    public String getParent() {
        return this.parent;
    }
    public String getParent1() {
        return this.parent1;
    }
    public String getParent2() {
        return this.parent2;
    }
    public String getMessage() {
        return this.message;
    }
    public String getTimeStamp() {
        return this.timeStamp;
    }
    public HashMap<String, String> getMap() {
        return this.map;
    }
    public String getCommitUID() {
        return this.commitUID;
    }
}
