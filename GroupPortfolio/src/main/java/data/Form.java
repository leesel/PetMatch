package com.google.sps.data;

/**A Comment in the comment list**/
public final class Comment{
    private final long id;
    private final String name;
    private final String comment;
    private final long timestamp;
    private final double sentimentScore;

    public Comment(long id, String name, String comment, long timestamp, double sentimentScore){
        this.id = id;
        this.name = name;
        this.comment = comment;
        this.timestamp = timestamp;
        this.sentimentScore = sentimentScore;
    }
}