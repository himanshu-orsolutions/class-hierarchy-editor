package com.che.classmanager.utils;

import org.bson.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * The utility class ResponseGenerator. It holds implementations to generate
 * various HTTP responses.
 */
public class ResponseGenerator {

	private ResponseGenerator() {
		// The utility class
	}

	/**
	 * Generates the bad request(400) response
	 * 
	 * @param errorMessage The error message
	 * @return The response
	 */
	public static ResponseEntity<String> generateBadRequest(String errorMessage) {

		return new ResponseEntity<>(new Document("ret", "false").append("message", errorMessage).toJson(),
				HttpStatus.BAD_REQUEST);
	}

	/**
	 * Generates the ok(200) response
	 * 
	 * @return The response
	 */
	public static ResponseEntity<String> okResponse() {

		return new ResponseEntity<>(new Document("ret", "true").toJson(), HttpStatus.OK);
	}

	/**
	 * Generates the ok(200) response
	 * 
	 * @param object The response entity
	 * @return The response
	 */
	public static ResponseEntity<Object> okResponse(Object object) {

		return new ResponseEntity<>(object, HttpStatus.OK);
	}
}
